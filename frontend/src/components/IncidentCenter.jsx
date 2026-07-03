function IncidentCenter({ incidents }) {
  return (
    <>
      <h2>Incident Center</h2>

      <div className="incident-center">
        {(incidents || []).length === 0 ? (
          <div className="incident-empty">
            No active incidents.
          </div>
        ) : (
          (incidents || []).map((incident) => (
            <div
              key={incident.id}
              className={`incident-card ${(incident.severity || "low").toLowerCase()}`}
            >
              <div className="incident-header">
                <span className={`badge ${(incident.severity || "low").toLowerCase()}`}>
                  {incident.severity}
                </span>

                <small>
                  {incident.time
                    ? new Date(incident.time).toLocaleString()
                    : "Unknown Time"}
                </small>
              </div>

              <h3>{incident.alert_type}</h3>

              <p>
                <strong>Device:</strong> {incident.device}
              </p>

              <p>
                <strong>Message:</strong> {incident.message}
              </p>

              <p>
                <strong>Status:</strong> {incident.status}
              </p>

              <p>
                <strong>MITRE ATT&CK for ICS:</strong>{" "}
                {incident.mitre_technique}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default IncidentCenter;