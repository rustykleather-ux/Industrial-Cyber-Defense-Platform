import API from "../api";

export const getAlerts = () => {
  return API.get("/alerts");
};