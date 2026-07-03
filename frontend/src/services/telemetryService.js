import API from "../api";

export const getPlantStatus = () => {
  return API.get("/plant-status");
};