from database import Base, engine, SessionLocal
from models import OTDevice, Alert, Vulnerability

Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Clear old demo data
db.query(Vulnerability).delete()
db.query(Alert).delete()
db.query(OTDevice).delete()
db.commit()

# Devices
plc1 = OTDevice(
    name="PLC-1",
    ip_address="192.168.50.10",
    device_type="PLC",
    vendor="OpenPLC",
    status="Online",
    risk_level="Low",
    firmware_version="1.0.3",
    location="Production Line 1"
)

plc2 = OTDevice(
    name="PLC-2",
    ip_address="192.168.50.11",
    device_type="PLC",
    vendor="Allen-Bradley",
    status="Online",
    risk_level="Critical",
    firmware_version="3.2.1",
    location="Production Line 2"
)

solar = OTDevice(
    name="Solar Inverter",
    ip_address="192.168.50.25",
    device_type="Inverter",
    vendor="SMA",
    status="Offline",
    risk_level="High",
    firmware_version="2.4.8",
    location="Solar Array"
)

workstation = OTDevice(
    name="Engineering Workstation",
    ip_address="192.168.50.100",
    device_type="Workstation",
    vendor="Dell",
    status="Online",
    risk_level="Medium",
    firmware_version="Windows 11 24H2",
    location="Engineering Office"
)

scada = OTDevice(
    name="SCADA Server",
    ip_address="192.168.50.200",
    device_type="SCADA",
    vendor="Ignition",
    status="Online",
    risk_level="Low",
    firmware_version="8.1.35",
    location="Control Room"
)

db.add_all([plc1, plc2, solar, workstation, scada])
db.commit()

# Refresh IDs after commit
db.refresh(plc1)
db.refresh(plc2)
db.refresh(solar)
db.refresh(workstation)
db.refresh(scada)

# Alerts
alerts = [
    Alert(
        device_id=plc2.id,
        severity="Critical",
        alert_type="Firmware",
        message="PLC firmware is outdated and should be reviewed.",
        status="Open",
        acknowledged=False
    ),
    Alert(
        device_id=solar.id,
        severity="High",
        alert_type="Communication Loss",
        message="Solar inverter communication lost.",
        status="Open",
        acknowledged=False
    ),
    Alert(
        device_id=workstation.id,
        severity="Medium",
        alert_type="Authentication",
        message="Multiple failed login attempts detected.",
        status="Open",
        acknowledged=False
    )
]

db.add_all(alerts)

# Vulnerabilities
vulnerabilities = [
    Vulnerability(
        device_id=plc2.id,
        cve_id="CVE-DEMO-0001",
        title="Outdated PLC Firmware",
        severity="Critical",
        cvss_score=9.1,
        status="Open",
        recommendation="Validate firmware version with vendor and plan controlled update window."
    ),
    Vulnerability(
        device_id=solar.id,
        cve_id="CVE-DEMO-0002",
        title="Inverter Communication Failure",
        severity="High",
        cvss_score=7.5,
        status="Open",
        recommendation="Check network path, switch port, firewall rules, and vendor remote access logs."
    )
]

db.add_all(vulnerabilities)
db.commit()

db.close()

print("Database seeded successfully.")