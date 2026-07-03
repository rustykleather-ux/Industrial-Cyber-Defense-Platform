import { useState } from "react";

function IncidentCenter({
  incidents,
  acknowledgeIncident,
  assignIncident,
  updateIncidentNotes,
  closeIncident,
}) {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [notes, setNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState("Unassigned");

  const openIncident = (incident) => {
    setSelectedIncident(incident);
    setAssignedTo(incident.assigned_to || "Unassigned");
    setNotes(incident.investigation_notes || "");
  };

  const handleAcknowledge = async () => {
    if (!selectedIncident) return;

    await acknowledgeIncident(selectedIncident.id);

    setSelectedIncident({
      ...selectedIncident,
      acknowledged: true,
      status: "Acknowledged",
    });
  };

  const handleSaveAssignment = async () => {
    if (!selectedIncident) return;

    await assignIncident(selectedIncident.id, assignedTo);

    setSelectedIncident({
      ...selectedIncident,
      assigned_to: assignedTo,
    });
  };

  const handleSaveNotes = async () => {
    if (!selectedIncident) return;

    await updateIncidentNotes(selectedIncident.id, notes);

    setSelectedIncident({
      ...selectedIncident,
      investigation_notes: notes,
    });
  };

  const handleCloseIncident = async () => {
    if (!selectedIncident) return;

    const analyst =
      assignedTo === "Unassigned" ? "SOC Analyst" : assignedTo;

    console.log("Close button clicked:", selectedIncident.id, analyst);

    await closeIncident(selectedIncident.id, analyst);

    setSelectedIncident(null);
  };

  return (
    <>
      <h2>Incident Center</h2>

      <div className="incident-center">
        {(incidents || []).length === 0 ? (
          <div className="incident-empty">No active incidents.</div>
        ) : (
          (incidents || []).map((incident) => (
            <div
              key={incident.id}
              className={`incident-card ${(incident.severity || "low").toLowerCase()}`}
              onClick={() => openIncident(incident)}
            >
              <div className="incident-header">
                <span className={`badge ${(incident.severity || "low").toLowerCase()}`}>
                  {incident.severity || "Unknown"}
                </span>

                <small>
                  {incident.time
                    ? new Date(incident.time).toLocaleString()
                    : "Unknown Time"}
                </small>
              </div>

              <h3>{incident.alert_type || "Incident"}</h3>

              <p>
                <strong>Device:</strong> {incident.device || "Unknown Device"}
              </p>

              <p>
                <strong>Status:</strong> {incident.status || "Unknown"}
              </p>

              <p>
                <strong>Assigned:</strong>{" "}
                {incident.assigned_to || "Unassigned"}
              </p>
            </div>
          ))
        )}
      </div>

      {selectedIncident && (
        <div
          className="drawer-overlay"
          onClick={() => setSelectedIncident(null)}
        >
          <div
            className="incident-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="drawer-close"
              onClick={() => setSelectedIncident(null)}
            >
              ×
            </button>

            <h2>Incident #{selectedIncident.id}</h2>

            <span
              className={`badge ${(selectedIncident.severity || "low").toLowerCase()}`}
            >
              {selectedIncident.severity || "Unknown"}
            </span>

            <div className="drawer-section">
              <h3>Summary</h3>
              <p>{selectedIncident.message || "No summary available."}</p>
            </div>

            <div className="drawer-section">
              <h3>Affected Asset</h3>

              <p>
                <strong>Device:</strong>{" "}
                {selectedIncident.device || "Unknown Device"}
              </p>

              <p>
                <strong>Alert Type:</strong>{" "}
                {selectedIncident.alert_type || "Unknown"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedIncident.status || "Unknown"}
              </p>

              <p>
                <strong>Acknowledged:</strong>{" "}
                {selectedIncident.acknowledged ? "Yes" : "No"}
              </p>

              <button
                className="ack-button"
                onClick={handleAcknowledge}
                disabled={selectedIncident.acknowledged}
              >
                {selectedIncident.acknowledged
                  ? "Acknowledged"
                  : "Acknowledge Incident"}
              </button>

              <p>
                <strong>Assigned To:</strong>{" "}
                {selectedIncident.assigned_to || "Unassigned"}
              </p>

              <label className="assign-label">Assign Analyst</label>

              <select
                className="assign-select"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="Unassigned">Unassigned</option>
                <option value="Rusty Folsom">Rusty Folsom</option>
                <option value="SOC Analyst">SOC Analyst</option>
                <option value="OT Engineer">OT Engineer</option>
                <option value="Incident Response Team">
                  Incident Response Team
                </option>
              </select>

              <button
                className="assign-button"
                onClick={handleSaveAssignment}
              >
                Save Assignment
              </button>
            </div>

            <div className="drawer-section">
              <h3>MITRE ATT&CK for ICS</h3>
              <p>{selectedIncident.mitre_technique || "Unmapped"}</p>
            </div>

            <div className="drawer-section">
              <h3>Recommended Actions</h3>
              <ul>
                <li>Validate the affected asset status with operations.</li>
                <li>
                  Review recent authentication and engineering workstation
                  activity.
                </li>
                <li>
                  Compare firmware/configuration against the approved baseline.
                </li>
                <li>Confirm network segmentation and firewall rules.</li>
                <li>Document findings and preserve relevant logs.</li>
              </ul>
            </div>

            <div className="drawer-section">
              <h3>Investigation Notes</h3>

              <textarea
                className="notes-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Document investigation steps, findings, actions taken, or next steps..."
              />

              <button className="notes-button" onClick={handleSaveNotes}>
                Save Notes
              </button>
            </div>

            <div className="drawer-section">
              <h3>Incident Resolution</h3>

              <p>
                <strong>Status:</strong>{" "}
                {selectedIncident.status || "Unknown"}
              </p>

              {selectedIncident.closed_by && (
                <p>
                  <strong>Closed By:</strong> {selectedIncident.closed_by}
                </p>
              )}

              {selectedIncident.closed_at && (
                <p>
                  <strong>Closed:</strong>{" "}
                  {new Date(selectedIncident.closed_at).toLocaleString()}
                </p>
              )}

              <button
                className="close-button"
                disabled={selectedIncident.status === "Closed"}
                onClick={handleCloseIncident}
              >
                {selectedIncident.status === "Closed"
                  ? "Incident Closed"
                  : "Close Incident"}
              </button>
            </div>

            <div className="drawer-section">
              <h3>Timeline</h3>
              <p>
                <strong>Detected:</strong>{" "}
                {selectedIncident.time
                  ? new Date(selectedIncident.time).toLocaleString()
                  : "Unknown"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IncidentCenter;