# 🏭 Industrial Cyber Defense Platform

An enterprise-style **Operational Technology (OT) and Information Technology (IT) cybersecurity platform** built with **Python, FastAPI, React, and SQLite**.

The platform provides centralized visibility into industrial assets, security alerts, vulnerabilities, and operational risk through a modern web dashboard. It is designed as a portfolio project that demonstrates practical software engineering and cybersecurity concepts commonly used in industrial control system (ICS) and SCADA environments.

---

## 🚀 Features

### 📊 Executive Dashboard

* Security overview dashboard
* Online vs. Offline device monitoring
* High-risk asset identification
* Active security alerts
* Vulnerability summary
* Overall security posture

---

### 🖥️ OT Asset Inventory

Manage industrial assets including:

* PLCs
* HMIs
* SCADA Servers
* Historians
* Engineering Workstations
* Solar Inverters
* Industrial Switches

Each asset tracks:

* IP Address
* Vendor
* Device Type
* Firmware Version
* Location
* Status
* Risk Level
* Last Seen Timestamp

---

### 🚨 Security Alert Management

Track and display active OT security events including:

* Firmware Outdated
* Communication Loss
* Device Offline
* Failed Authentication Attempts
* Unauthorized Access
* Network Anomalies

Alerts include:

* Severity
* Device
* Alert Type
* Status
* Timestamp
* Acknowledgement State

---

### 🔍 Vulnerability Management

Store and manage OT vulnerabilities with:

* CVE Tracking
* CVSS Scoring
* Risk Classification
* Recommended Remediation
* Device Association
* Vulnerability Status

---

### 💾 SQLite Database

Persistent storage for:

* Device Inventory
* Security Alerts
* Vulnerabilities

Built using SQLAlchemy ORM.

---

### ⚙️ REST API

FastAPI-powered backend exposing endpoints including:

* `/devices`
* `/alerts`
* `/dashboard`
* `/vulnerabilities`

Designed for future integration with:

* SIEM Platforms
* OT Monitoring Solutions
* PLC Discovery
* Asset Scanners

---

## 🛠️ Technology Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* Uvicorn
* Pydantic

### Frontend

* React
* Axios
* JavaScript
* HTML5
* CSS3

### Database

* SQLite
* SQLAlchemy ORM

---

## 🏗️ Current Architecture

```text
IndustrialCyberPlatform

frontend/
    React Dashboard

backend/
    main.py
    database.py
    models.py
    schemas.py
    seed.py
    alerts.py
    ot_platform.db
```

---

## 📈 Current Capabilities

* OT Device Inventory
* Executive Dashboard
* Security Alert Management
* Vulnerability Tracking
* Persistent Database
* REST API
* Risk Classification

---

## 🚧 Planned Features

* OT Network Discovery
* Live Device Monitoring
* PLC Configuration Auditing
* Firmware Compliance Checking
* Industrial Protocol Monitoring (Modbus, DNP3, OPC UA)
* Network Topology Visualization
* MITRE ATT&CK for ICS Mapping
* Incident Response Workflow
* Compliance Reporting
* Executive PDF Reports
* AI-Assisted Threat Analysis
* Real-Time Dashboards
* Historical Trend Analysis

---

## 🎯 Project Goals

This project is intended to demonstrate skills in:

* Operational Technology (OT) Security
* Industrial Control Systems (ICS)
* SCADA Security
* Python Development
* FastAPI API Design
* React Frontend Development
* Database Design
* Secure Software Engineering
* Asset Inventory Management
* Vulnerability Management
* Incident Response
* Enterprise Dashboard Design

---

## ⚠️ Disclaimer

This project is intended for educational, research, and portfolio purposes. It simulates industrial cybersecurity workflows and should be adapted and validated before deployment in production OT or ICS environments.
