from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class OTDeviceBase(BaseModel):
    name: str
    ip_address: str
    device_type: str
    vendor: str
    status: str = "Unknown"
    risk_level: str = "Low"
    firmware_version: str = "Unknown"
    location: str = "Unknown"


class OTDeviceCreate(OTDeviceBase):
    pass


class OTDeviceResponse(OTDeviceBase):
    id: int
    last_seen: datetime

    class Config:
        from_attributes = True


class AlertBase(BaseModel):
    severity: str
    alert_type: str = "General"
    message: str
    status: str = "Open"
    acknowledged: bool = False
    device_id: Optional[int] = None


class AlertCreate(AlertBase):
    pass


class AlertResponse(AlertBase):
    id: int
    timestamp: datetime
    device_name: Optional[str] = None

    class Config:
        from_attributes = True


class VulnerabilityBase(BaseModel):
    device_id: Optional[int] = None
    cve_id: str = "Unknown"
    title: str
    severity: str = "Medium"
    cvss_score: float = 0.0
    status: str = "Open"
    recommendation: str = "Review and remediate."


class VulnerabilityCreate(VulnerabilityBase):
    pass


class VulnerabilityResponse(VulnerabilityBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True