import API from "../api";

export const simulateAttackRequest = (attackType) => {
  return API.post(`/simulate-attack/${attackType}`);
};

export const resetDemoRequest = () => {
  return API.post("/reset-demo");
};