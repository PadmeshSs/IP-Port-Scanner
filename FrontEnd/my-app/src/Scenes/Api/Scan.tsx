import type { ScanData, Scanid, scantypes } from "../Types/Scantype";

const base_url = "http://127.0.0.1:8000";

export async function startscan(target: string, scantype: scantypes): Promise<Scanid> {
    const res = await fetch(`${base_url}/scan/start`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ target, scan_type: scantype })
    });
    return res.json();
}

export async function getscan(scan_id: string): Promise<ScanData> {
    const res = await fetch(`${base_url}/scan/${scan_id}`);
    return res.json();
}