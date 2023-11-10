import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL3 = `${BACKEND_URL}/api/enfermeros/`;

// Create New Product
const createEnfermero = async (formData) => {
  const response = await axios.post(`${API_URL3}add-enfermero`, formData);
  
  return response.data;
};

console.log('API_URL:', API_URL3);


// Get all products
const getEnfermeros = async () => {
  const response = await axios.get(API_URL3);
  return response.data;
};

// Delete a Product
const deleteEnfermero = async (id) => {
  const response = await axios.delete(API_URL3 + id);
  return response.data;
};
// Get a Product
const getEnfermero = async (id) => {
  const response = await axios.get(API_URL3 + id);
  return response.data;
};
// Update Product
const updateEnfermero = async (id, formData) => {
  const response = await axios.patch(`${API_URL3}updateEnfermero/${id}`, formData);
  return response.data;
};

const enfermeroService = {
  createEnfermero,
  getEnfermeros,
  getEnfermero,
  deleteEnfermero,
  updateEnfermero,
};

export default enfermeroService;