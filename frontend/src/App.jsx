import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import DemoControls from "./components/DemoControls";
import NetworkTopology from "./components/NetworkTopology";
import LivePlantStatus from "./components/LivePlantStatus";
import DeviceInventory from "./components/DeviceInventory";
import VulnerabilityTable from "./components/VulnerabilityTable";
import AlertsPanel from "./components/AlertsPanel";

import { getDevices } from "./services/deviceService";
import { getDashboard } from "./services/dashboardService";
import { getAlerts } from "./services/alertService";
import { getVulnerabilities } from "./services/vulnerabilityService";
import { getPlantStatus } from "./services/telemetryService";
import {
  simulateAttackRequest,
  resetDemoRequest,
} from "./services/simulationService";

function App() {
  const [devices, setDevices] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [plantStatus, setPlantStatus] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadPlantStatus();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const loadPlantStatus = () => {
    getPlantStatus()
      .then((res) => setPlantStatus(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Plant Status Error:", err));
  };

  const loadData = () => {
    loadPlantStatus();

    getDevices()
      .then((res) => setDevices(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Devices Error:", err));

    getVulnerabilities()
      .then((res) =>
        setVulnerabilities(Array.isArray(res.data) ? res.data : [])
      )
      .catch((err) => console.error("Vulnerabilities Error:", err));

    getDashboard()
      .then((res) => setDashboard(res.data || null))
      .catch((err) => console.error("Dashboard Error:", err));

    getAlerts()
      .then((res) => setAlerts(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Alerts Error:", err));
  };

  const simulateAttack = (attackType) => {
    simulateAttackRequest(attackType)
      .then(() => loadData())
      .catch((err) => console.error("Simulation Error:", err));
  };

  const resetDemo = () => {
    resetDemoRequest()
      .then(() => loadData())
      .catch((err) => console.error("Reset Error:", err));
  };

  return (
    <div className="app">
      <Header />

      <DashboardCards dashboard={dashboard} />

      <DemoControls simulateAttack={simulateAttack} resetDemo={resetDemo} />

      <NetworkTopology devices={devices} />

      <LivePlantStatus plantStatus={plantStatus} />

      <DeviceInventory devices={devices} />

      <VulnerabilityTable vulnerabilities={vulnerabilities} />

      <AlertsPanel alerts={alerts} />
    </div>
  );
}

export default App;