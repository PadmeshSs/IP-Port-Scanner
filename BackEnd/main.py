from fastapi import FastAPI, BackgroundTasks
import uuid
import re
import ipaddress
from scanner.store import scans
from scanner.scan_manager import start_scan
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_valid_target(target: str) -> bool:
    target = target.strip()

    #allow IP
    try:
        ipaddress.ip_address(target)
        return True
    except:
        pass

    #allow CIDR
    try:
        ipaddress.ip_network(target, strict=False)
        return True
    except:
        pass

    #allow ranges (simple check)
    range_pattern = r"^\d{1,3}(\.\d{1,3}){3}-\d{1,3}$"
    if re.match(range_pattern, target):
        return True

    # allow domain
    domain_pattern = r"^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"
    if re.match(domain_pattern, target):
        return True

    return False

@app.post("/scan/start")
def start_scan_api(data: dict, background_tasks: BackgroundTasks):
    target = data['target']
    if not is_valid_target(target):
        return {"error": "Invalid target format"}
    
    scan_id = str(uuid.uuid4())
    print("MAIN scans id:", id(scans))

    # Initialize scan state
    scans[scan_id] = {
        "status": "running",
        "logs": [],
        "nodes": [],
        "summary": {}
    }

    # Start background scan
    background_tasks.add_task(
        start_scan,
        scan_id,
        data["target"],
        data["scan_type"]
    )

    return {"scan_id": scan_id}


@app.get("/scan/{scan_id}")
def get_scan(scan_id: str):
    return scans.get(scan_id, {"error": "not found"})
