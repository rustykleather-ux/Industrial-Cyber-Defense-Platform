from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Industrial Cyber Defense Platform")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class OTDevice(BaseModel):
    id: int
    name: str
    ip_address: str
    device_type: str
    vendor: str
    status: str
    risk_level: str
    last_seen: str

devices = [
    OTDevice(
        id=1,
        name="PLC-1",
        ip_address="192.168.50.10",
        device_type="PLC",
        vendor="OpenPLC",
        status="Online",
        risk_level="Low",
        last_seen=datetime.now().isoformat()
    ),
    OTDevice(
        id=2,
        name="HMI-1",
        ip_address="192.168.50.20",
        device_type="HMI",
        vendor="Ignition",
        status="Online",
        risk_level="Medium",
        last_seen=datetime.now().isoformat()
    ),
    OTDevice(
        id=3,
        name="Solar-Inverter-1",
        ip_address="192.168.50.30",
        device_type="Inverter",
        vendor="Simulated",
        status="Offline",
        risk_level="High",
        last_seen=datetime.now().isoformat()
    ),
    OTDevice(
        id=4,
        name="Historian-1",
        ip_address="192.168.50.40",
        device_type="Historian",
        vendor="InfluxDB",
        status="Online",
        risk_level="Low",
        last_seen=datetime.now().isoformat()
    )
]

@app.get("/")
def root():
    return {"message": "Industrial Cyber Defense Platform API"}

@app.get("/devices", response_model=List[OTDevice])
def get_devices():
    return devices

@app.get("/dashboard")
def dashboard():
    total = len(devices)
    online = len([d for d in devices if d.status == "Online"])
    offline = len([d for d in devices if d.status == "Offline"])
    high_risk = len([d for d in devices if d.risk_level == "High"])

    return {
        "total_devices": total,
        "online_devices": online,
        "offline_devices": offline,
        "high_risk_devices": high_risk,
        "overall_status": "Attention Required" if offline or high_risk else "Healthy"
    }