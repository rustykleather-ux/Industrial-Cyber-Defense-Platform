import API from "../api";


export const getDevices = () => {
    return API.get("/devices");
};