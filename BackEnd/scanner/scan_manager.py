import time
import subprocess
import traceback
from datetime import datetime

from scanner.nmap_runner import (
    run_nmap_host_discovery,
    run_nmap_port_scan,
    run_nmap_os_detection
)

from scanner.parser import (
    parse_hosts,
    parse_ports,
    parse_os
)

from scanner.risk_engine import (
    get_port_risk,
    generate_vulnerabilities
)

from scanner.store import scans


# -------------------------------
# Helper: Logging
# -------------------------------
def add_log(scan_id, message, log_type="info"):
    scans[scan_id]["logs"].append({
        "time": datetime.now().strftime("%M:%S"),
        "message": message,
        "type": log_type
    })


# -------------------------------
# Main Scan Function
# -------------------------------
def start_scan(scan_id, target, scan_type):

    scans[scan_id] = {
        "status": "running",
        "logs": [],
        "nodes": [],
        "summary": {},
        "target": target,
        "scan_type": scan_type
    }

    print(f"--- SCAN STARTED: {scan_id} ---")

    try:
        start_time = time.time()

        scan_labels = {
            "quick": "Quick Scan (Top 100 Ports - Fast)",
            "standard": "Standard Scan (Service Detection)",
            "full": "Full Scan (All Ports - Slow)"
        }

        port_range_map = {
            "quick": 100,
            "standard": 1000,
            "full": 65535
        }

        add_log(scan_id, f"Starting scan on {target}")
        add_log(scan_id, f"{scan_labels.get(scan_type)}")

        # -------------------------------
        # 🔥 HOST DISCOVERY OPTIMIZATION
        # -------------------------------
        if scan_type == "quick":
            # ⚡ Skip discovery → faster
            hosts = [target]
            add_log(scan_id, "Skipping host discovery (quick scan)")
        else:
            add_log(scan_id, "Step 1: Discovering hosts...")
            raw_hosts = run_nmap_host_discovery(target)

            if not raw_hosts or "Nmap scan report" not in raw_hosts:
                scans[scan_id]["status"] = "error"
                add_log(scan_id, "Invalid or unreachable target", "error")
                return

            hosts = parse_hosts(raw_hosts)
            add_log(scan_id, f"Found {len(hosts)} host(s)")

            if not hosts:
                scans[scan_id]["status"] = "error"
                add_log(scan_id, "No valid hosts found", "error")
                return

        nodes = []
        total_open_ports = 0

        # -------------------------------
        # 🔥 SCAN EACH HOST (WITH INDEX)
        # -------------------------------
        for i, host in enumerate(hosts):
            add_log(scan_id, f"Scanning host {host} ({i+1}/{len(hosts)})")

            try:
                raw_ports = run_nmap_port_scan(host, scan_type)
                parsed_ports = parse_ports(raw_ports)

            except subprocess.TimeoutExpired:
                add_log(scan_id, f"Timeout scanning {host}", "error")
                parsed_ports = []

            except Exception as e:
                add_log(scan_id, f"Port scan error: {str(e)}", "error")
                parsed_ports = []

            ports = []
            for p in parsed_ports:
                risk = get_port_risk(p["port"])
                ports.append({
                    "port": p["port"],
                    "service": p["service"],
                    "version": p["version"],
                    "status": "open",
                    "risk": risk
                })

            total_open_ports += len(ports)

            vulns = generate_vulnerabilities(ports)

            try:
                raw_os = run_nmap_os_detection(host)
                os_info = parse_os(raw_os)
            except Exception:
                os_info = "Unknown"

            nodes.append({
                "ip": host,
                "os": os_info,
                "ports": ports,
                "vulnerabilities": vulns
            })

        # -------------------------------
        # SUMMARY
        # -------------------------------
        end_time = time.time()

        summary = {
            "hosts": len(nodes),
            "open_ports": total_open_ports,
            "total_ports": port_range_map.get(scan_type, 1000),
            "status": "completed",
            "time_taken": f"{round(end_time - start_time, 2)}s"
        }

        scans[scan_id]["status"] = "completed"
        scans[scan_id]["nodes"] = nodes
        scans[scan_id]["summary"] = summary

        add_log(scan_id, "Scan completed successfully", "success")

        print(f"--- SCAN COMPLETED: {scan_id} ---")

    except Exception as e:
        error_details = traceback.format_exc()

        scans[scan_id]["status"] = "error"
        scans[scan_id]["error_details"] = error_details

        add_log(scan_id, f"Critical error: {str(e)}", "error")

        print(f"!!! SCAN FAILED: {scan_id} !!!\n{error_details}")