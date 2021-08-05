import axios from 'axios';

//local
const API = axios.create({ baseURL: 'http://localhost:4444' });

//cloud
// const API = axios.create({ baseURL: 'https://prubackend.herokuapp.com/' });

export const createFamily = combinedData => API.post('/family', combinedData);
export const updateFamily = (id, updatedFamily) => API.patch(`/family/${id}`, updatedFamily);
export const fetchFamilies = () => API.get('/family');
export const deleteFamily = id => API.delete(`/family/${id}`);

export const fetchChildren = id => API.get(`/children/${id}`);
export const fetchChildrens = () => API.get('/children');
export const createChildren = newChildren => API.post('/children', newChildren);
export const updateChildren = (id, updatedChildren) => API.patch(`/children/${id}`, updatedChildren);
export const deleteChildren  = id => API.delete(`/children/${id}`);
