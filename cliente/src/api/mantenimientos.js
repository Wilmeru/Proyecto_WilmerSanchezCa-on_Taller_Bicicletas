import axios from "axios";
const URL = "http://localhost:8000";
const endpoint = `${URL}/api/mantenimientos`

export const fetchMaintenances = () => axios.get(endpoint);

export const fetchMaintenance = (id) =>
  axios.get(`${endpoint}/${id}`);

export const createMantenimiento = (newMantenimiento) =>
    axios.post(endpoint, newMantenimiento);

export const updateMantenimiento = (id, mantenimiento) =>
    axios.put(`${endpoint}/${id}`, mantenimiento)

export const deleteMantenimiento = (id) =>
    axios.delete(`${endpoint}/${id}`)