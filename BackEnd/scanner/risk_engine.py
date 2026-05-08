def get_port_risk(port):
    if port in [21, 23, 445]:
        return "high"
    elif port in [22, 80]:
        return "medium"
    return "low"


def generate_vulnerabilities(ports):
    vulns = []

    for p in ports:
        if p["port"] == 21:
            vulns.append({
                "port": 21,
                "severity": "high",
                "message": "FTP is insecure"
            })

        if p["port"] == 23:
            vulns.append({
                "port": 23,
                "severity": "high",
                "message": "Telnet is insecure"
            })

        if p["port"] == 80:
            vulns.append({
                "port": 80,
                "severity": "medium",
                "message": "No HTTPS"
            })

    return vulns