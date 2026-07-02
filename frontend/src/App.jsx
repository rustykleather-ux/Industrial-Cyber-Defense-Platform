import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [devices, setDevices] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const[plantStatus, setPlantStatus] = useState([])

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
    .get("http://127.0.0.1:8000/Plant-Status")
    .then((res) => setPlantStatus(res.data))
    .catch((err) => console.error("Plant Status Error", err));

    axios
      .get("http://127.0.0.1:8000/devices")
      .then((res) => setDevices(res.data))
      .catch((err) => console.error("Devices Error:", err));
    
    axios
      .get("http://127.0.0.1:8000/vulnerabilities")
      .then((res) => setVulnerabilities(res.data))
      .catch((err) => console.error("Vulnerabilities Error:", err));

    axios
      .get("http://127.0.0.1:8000/dashboard")
      .then((res) => setDashboard(res.data))
      .catch((err) => console.error("Dashboard Error:", err));

    axios
      .get("http://127.0.0.1:8000/alerts")
      .then((res) => setAlerts(res.data))
      .catch((err) => console.error("Alerts Error:", err));
  };  

useEffect(() => {
  const interval = setInterval(() => {
    axios
      .get("http://127.0.0.1:8000/plant-status")
      .then((res) => setPlantStatus(res.data))
      .catch((err) => console.error("Plant Status Refresh Error:", err));
  }, 3000);

  return () => clearInterval(interval);
}, []);

    const simulateAttack = (attackType) => {
    axios
      .post(`http://127.0.0.1:8000/simulate-attack/${attackType}`)
      .then(() => {
        loadData(); // Refresh dashboard after simulation
      })
      .catch((err) => console.error("Simulation Error:", err));
  };
  
  const getDevice = (name) => {
    return devices.find((device) => device.name === name);
  };

  const getNodeClass = (device) => {
    if (!device) return "unknown";

    if (device.status === "Offline") return "critical";

    const risk = device.calculated_risk || device.risk_level;

    if (risk === "Critical") return "critical";
    if (risk === "High") return "warning";
    if (risk === "Medium") return "medium";

    return "healthy";
  };


 
  return (
    <div className="app">
      <h1>Industrial Cyber Defense Platform</h1>
      <p className="subtitle">
        OT / IT Security Monitoring Dashboard
      </p>

      {dashboard && (
  <div className="cards">
    <div className="card">
      <span>Total Devices</span>
      <strong>{dashboard.total_devices}</strong>
    </div>

    <div className="card">
      <span>Online Devices</span>
      <strong>{dashboard.online_devices}</strong>
    </div>

    <div className="card warning">
      <span>Offline Devices</span>
      <strong>{dashboard.offline_devices}</strong>
    </div>

    <div className="card danger">
      <span>High Risk Devices</span>
      <strong>{dashboard.high_risk_devices}</strong>
    </div>

    <div className="card danger">
      <span>Open Vulnerabilities</span>
      <strong>{dashboard.open_vulnerabilities}</strong>
    </div>
  </div>

      )}

      <h2>Simulated Attack Engine</h2>

      <div className="attack-buttons">
        <button onClick={() => simulateAttack("inverter-offline")}>
          🔴 Inverter Offline
        </button>

        <button onClick={() => simulateAttack("plc-firmware")}>
          ⚠️ PLC Firmware Change
        </button>

        <button onClick={() => simulateAttack("failed-logins")}>
          🔑 Failed Logins
        </button>

        <button onClick={() => simulateAttack("network-scan")}>
          🌐 Network Scan
        </button>
      </div>

    <h2>OT Network Topology</h2>

<div className="topology">
  <div className="topology-node firewall">Firewall</div>

  <div className="topology-line"></div>

  <div className={`topology-node ${getNodeClass(getDevice("SCADA Server"))}`}>
    SCADA Server
    <span>{getDevice("SCADA Server")?.ip_address || "Unknown IP"}</span>
  </div>

  <div className="topology-branches">
    <div className="branch">
      <div className="topology-line"></div>
      <div className={`topology-node ${getNodeClass(getDevice("PLC-1"))}`}>
        PLC-1
        <span>{getDevice("PLC-1")?.ip_address || "Unknown IP"}</span>
      </div>
    </div>

    <div className="branch">
      <div className="topology-line"></div>
      <div className={`topology-node ${getNodeClass(getDevice("PLC-2"))}`}>
        PLC-2
        <span>{getDevice("PLC-2")?.ip_address || "Unknown IP"}</span>
      </div>
    </div>

    <div className="branch">
      <div className="topology-line"></div>
      <div className={`topology-node ${getNodeClass(getDevice("Solar Inverter"))}`}>
        Solar Inverter
        <span>{getDevice("Solar Inverter")?.ip_address || "Unknown IP"}</span>
      </div>
    </div>
  </div>

  <div className="topology-branches">
    <div className="branch">
      <div className="topology-line"></div>
      <div className={`topology-node ${getNodeClass(getDevice("Engineering Workstation"))}`}>
        Engineering Workstation
        <span>
          {getDevice("Engineering Workstation")?.ip_address || "Unknown IP"}
        </span>
      </div>
    </div>
  </div>
</div>     
  
  <h2>Live Plant Status</h2>

<div className="plant-grid">
  {plantStatus.map((item, index) => (
    <div key={index} className={`plant-card ${item.status?.toLowerCase()}`}>
      <h3>{item.device}</h3>
      <p className="plant-type">{item.type}</p>

      <p>
        <strong>Status:</strong> {item.status}
      </p>

      {item.temperature !== undefined && (
        <p>
          <strong>Temperature:</strong> {item.temperature}°F
        </p>
      )}

      {item.power_output_kw !== undefined && (
        <p>
          <strong>Power Output:</strong> {item.power_output_kw} kW
        </p>
      )}

      {item.voltage !== undefined && (
        <p>
          <strong>Voltage:</strong> {item.voltage} V
        </p>
      )}

      {item.cpu_usage !== undefined && (
        <p>
          <strong>CPU:</strong> {item.cpu_usage}%
        </p>
      )}

      {item.memory_usage !== undefined && (
        <p>
          <strong>Memory:</strong> {item.memory_usage}%
        </p>
      )}

      {item.active_sessions !== undefined && (
        <p>
          <strong>Active Sessions:</strong> {item.active_sessions}
        </p>
      )}

      {item.failed_logins !== undefined && (
        <p>
          <strong>Failed Logins:</strong> {item.failed_logins}
        </p>
      )}

      <p>
        <strong>Latency:</strong> {item.network_latency} ms
      </p>

      <small>
        Updated:{" "}
        {item.timestamp
          ? new Date(item.timestamp).toLocaleTimeString()
          : "Unknown"}
      </small>
    </div>
  ))}
</div>

      {/* Device Inventory */}
      <h2>OT Asset Inventory</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>IP Address</th>
            <th>Type</th>
            <th>Vendor</th>
            <th>Status</th>
            <th>Risk</th>
            <th>Risk Score</th>
            <th>Calculated Risk</th>
            <th>Firmware</th>
            <th>Location</th>
            <th>Last Seen</th>
          </tr>
        </thead>

        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>{device.ip_address}</td>
              <td>{device.device_type}</td>
              <td>{device.vendor}</td>
              <td>{device.status}</td>
              <td>
              <span className={`badge ${device.risk_level?.toLowerCase()}`}>
              {device.risk_level}
              </span>
              </td>

              <td>{device.risk_score}</td>

              <td>
                <span className={`badge ${device.calculated_risk?.toLowerCase()}`}>
                  {device.calculated_risk}
                </span>
              </td>
              <td>{device.firmware_version}</td>
              <td>{device.location}</td>
              <td>
                {device.last_seen
                  ? new Date(device.last_seen).toLocaleString()
                  : "Unknown"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Vulnerabilities</h2>

<table>
  <thead>
    <tr>
      <th>CVE</th>
      <th>Title</th>
      <th>Severity</th>
      <th>CVSS</th>
      <th>Status</th>
      <th>Recommendation</th>
    </tr>
  </thead>

  <tbody>
    {vulnerabilities.map((vuln) => (
      <tr key={vuln.id}>
        <td>{vuln.cve_id}</td>
        <td>{vuln.title}</td>
        <td>
          <span className={`badge ${vuln.severity?.toLowerCase()}`}>
            {vuln.severity}
          </span>
        </td>
        <td>{vuln.cvss_score}</td>
        <td>{vuln.status}</td>
        <td>{vuln.recommendation}</td>
      </tr>
    ))}
  </tbody>
</table>

      {/* Security Alerts */}
      <h2>Active Security Alerts</h2>

      <div className="alerts">
        {alerts.length === 0 ? (
          <div className="alert">
            <strong>No Active Alerts</strong>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert ${(alert.severity || "low").toLowerCase()}`}
            >
              <h3>{alert.device}</h3>

              <strong>Severity:</strong>{" "}
              <span className={`badge ${alert.severity?.toLowerCase()}`}>
                {alert.severity}
              </span>

              <p>
                <strong>Alert:</strong> {alert.message}
              </p>

              <small>
                {alert.time
                  ? new Date(alert.time).toLocaleString()
                  : "Unknown"}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;