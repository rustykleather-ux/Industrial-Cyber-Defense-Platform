import API from "../api";

export const getIncidents = () => {
  return API.get("/incidents");
};