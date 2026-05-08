import subprocess

NMAP_PATH = r"C:\Program Files (x86)\Nmap\nmap.exe"  # adjust if needed


# -------------------------------
# Host Discovery (FAST)
# -------------------------------
def run_nmap_host_discovery(target: str) -> str:
    command = [
        "nmap",
        "-sn",          # ping scan only
        "-T4",          # fast timing
        "-n",           # no DNS
        "--host-timeout", "5s",
        target
    ]

    result = subprocess.run(command, capture_output=True, text=True)
    return result.stdout


# -------------------------------
# Port Scan (CONTROLLED BY TYPE)
# -------------------------------
def run_nmap_port_scan(target: str, scan_type: str) -> str:

    if scan_type == "quick":
        command = [
            "nmap",
            "-F",              # top 100 ports
            "-T4",
            "-n",
            "--host-timeout", "5s",
            target
        ]

    elif scan_type == "standard":
        command = [
            "nmap",
            "-sT",             # TCP connect
            "-sV",             # version detection
            "-T4",
            "-n",
            target
        ]

    elif scan_type == "full":
        command = [
            "nmap",
            "-p-",             # all ports
            "-sT",
            "-sV",
            "-T4",
            "-n",
            "--host-timeout", "15s",
            target
        ]

    else:
        command = ["nmap", target]

    result = subprocess.run(command, capture_output=True, text=True)
    return result.stdout


# -------------------------------
# OS Detection
# -------------------------------
def run_nmap_os_detection(target: str) -> str:
    command = [
        "nmap",
        "-O",     # OS detection
        "-T4",
        "-n",
        target
    ]

    result = subprocess.run(command, capture_output=True, text=True)
    return result.stdout