import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getCustomers   = () => axios.get(`${BASE_URL}/customers`);
export const addCustomer    = (data) => axios.post(`${BASE_URL}/customers`, data);
export const updateCustomer = (id, data) => axios.put(`${BASE_URL}/customers/${id}`, data);
export const deleteCustomer = (id) => axios.delete(`${BASE_URL}/customers/${id}`);

export const getVehicles   = () => axios.get(`${BASE_URL}/vehicles`);
export const addVehicle    = (data) => axios.post(`${BASE_URL}/vehicles`, data);
export const updateVehicle = (id, data) => axios.put(`${BASE_URL}/vehicles/${id}`, data);
export const deleteVehicle = (id) => axios.delete(`${BASE_URL}/vehicles/${id}`);

export const getPolicies   = () => axios.get(`${BASE_URL}/policies`);
export const addPolicy     = (data) => axios.post(`${BASE_URL}/policies`, data);
export const updatePolicy  = (id, data) => axios.put(`${BASE_URL}/policies/${id}`, data);
export const deletePolicy  = (id) => axios.delete(`${BASE_URL}/policies/${id}`);

export const getClaims   = () => axios.get(`${BASE_URL}/claims`);
export const addClaim    = (data) => axios.post(`${BASE_URL}/claims`, data);
export const updateClaim = (id, data) => axios.put(`${BASE_URL}/claims/${id}`, data);
export const deleteClaim = (id) => axios.delete(`${BASE_URL}/claims/${id}`);
