import API from "../api";

export const getIncidents = () => {
  return API.get("/incidents");
};

export const acknowledgeIncidentRequest = (incidentId) => {
  return API.post(`/incidents/${incidentId}/acknowledge`);
};
export const assignIncidentRequest = (incidentId, assignedTo) => {
  return API.post(`/incidents/${incidentId}/assign`, {
    assigned_to: assignedTo,
  });
};