from datetime import datetime

alerts = [
    {
        "id" : 1,
        "severity": "Critical",
        "device": "PLC-2",
        "message": "Firmware is outdate",
        "time": datetime.now().isoformat()
    },
    {
        "id": 2,
        "serverity": "High",
        "device": "Solar Inverter",
        "message": "Communication Lost",
        "time": datetime.now().isoformat()
    },
    {
        "id": 3,
        "severity": "Medium",
        "device": "Engineering Workstation",
        "message": "Multiple Failed Logins",
        "time": datetime.now().isoformat()
    }
]