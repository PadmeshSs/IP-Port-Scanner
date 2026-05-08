def parse_hosts(output):
    hosts = []

    for line in output.split("\n"):
        if "Nmap scan report for" in line:
            parts = line.split("for")[-1].strip()

            if "(" in parts:
                ip = parts.split("(")[-1].replace(")", "").strip()
            else:
                ip = parts.strip()

            hosts.append(ip)

    return hosts


def parse_ports(output):
    ports = []

    for line in output.split("\n"):
        line = line.strip()

        if not line or line.startswith("PORT") or line.startswith("Service"):
            continue

        if "/tcp" in line:
            parts = line.split()

            if len(parts) >= 3 and parts[1] == "open":
                try:
                    port = int(parts[0].split("/")[0])
                    service = parts[2]
                    version = " ".join(parts[3:]) if len(parts) > 3 else ""

                    ports.append({
                        "port": port,
                        "service": service,
                        "version": version
                    })
                except:
                    continue

    return ports


def parse_os(output):
    for line in output.split("\n"):
        if "Running:" in line:
            return line.split("Running:")[-1].strip()

    return "Unknown"