from pydantic import BaseModel
from typing import List

class Port(BaseModel):
    port: int
    service: str
    version: str
    status: str
    risk: str


class Node(BaseModel):
    ip: str
    os: str
    ports: List[Port]
    vulnerabilities: List[dict]


class ScanSummary(BaseModel):
    hosts: int
    open_ports: int
    status: str
    time_taken: str


class ScanResult(BaseModel):
    target: str
    scan_type: str
    summary: ScanSummary
    nodes: List[Node]
    logs: List[str]