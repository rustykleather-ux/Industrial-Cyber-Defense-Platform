import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [devices, setDevices] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/devices")
      .then(res => setDevices(res.data))
      .catch(err => console.error(err));

    axios.get("http://127.0.0.1:8000/dashboard")
      .then(res => setDashboard(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="app">
      <h1>Industrial Cyber Defense Platform</h1>
      <p className="subtitle">OT / IT Security Monitoring Dashboard</p>

      {dashboard && (
        <div className="cards">
          <div className="card">
            <span>Total Devices</span>
            <strong>{dashboard.total_devices}</strong>
          </div>

          <div className="card">
            <span>Online</span>
            <strong>{dashboard.online_devices}</strong>
          </div>

          <div className="card warning">
            <span>Offline</span>
            <strong>{dashboard.offline_devices}</strong>
          </div>

          <div className="card danger">
            <span>High Risk</span>
            <strong>{dashboard.high_risk_devices}</strong>
          </div>
        </div>
      )}

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
            <th>Last Seen</th>
          </tr>
        </thead>

        <tbody>
          {devices.map(device => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>{device.ip_address}</td>
              <td>{device.device_type}</td>
              <td>{device.vendor}</td>
              <td>{device.status}</td>
              <td>{device.risk_level}</td>
              <td>{new Date(device.last_seen).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;