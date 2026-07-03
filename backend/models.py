from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


class OTDevice(Base):
    __tablename__ = "ot_devices"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    ip_address = Column(String, nullable=False, unique=True, index=True)
    device_type = Column(String, nullable=False)
    vendor = Column(String, nullable=False)
    status = Column(String, default="Unknown")
    risk_level = Column(String, default="Low")
    firmware_version = Column(String, default="Unknown")
    location = Column(String, default="Unknown")
    last_seen = Column(DateTime, default=datetime.utcnow)

    alerts = relationship("Alert", back_populates="device")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey("ot_devices.id"), nullable=True)

    severity = Column(String, nullable=False)
    alert_type = Column(String, default="General")
    message = Column(String, nullable=False)
    status = Column(String, default="Open")
    acknowledged = Column(Boolean, default=False)
    assigned_to = Column(String, default="Unassigned")
    timestamp = Column(DateTime, default=datetime.utcnow)
    

    device = relationship("OTDevice", back_populates="alerts")


class Vulnerability(Base):
    __tablename__ = "vulnerabilities"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey("ot_devices.id"), nullable=True)

    cve_id = Column(String, default="Unknown")
    title = Column(String, nullable=False)
    severity = Column(String, default="Medium")
    cvss_score = Column(Float, default=0.0)
    status = Column(String, default="Open")
    recommendation = Column(String, default="Review and remediate.")

    created_at = Column(DateTime, default=datetime.utcnow)