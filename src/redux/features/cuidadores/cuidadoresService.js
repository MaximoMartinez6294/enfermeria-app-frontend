import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL2 = `${BACKEND_URL}/api/cuidadores/`;

// Create New Product
const createCuidador = async (formData) => {
  const response = await axios.post(`${API_URL2}add-cuidador`, formData);
  
  
  return response.data;
  
  
};

console.log('API_URL:', API_URL2);


// Get all products
const getCuidadores = async () => {
  const response = await axios.get(API_URL2);
  return response.data;
};

// Delete a Product
const deleteCuidador = async (id) => {
  const response = await axios.delete(API_URL2 + id);
  return response.data;
};
// Get a Product
const getCuidador = async (id) => {
  const response = await axios.get(API_URL2 + id);
  return response.data;
};
// Update Product
const updateCuidador = async (id, formData) => {
  const response = await axios.patch(`${API_URL2}updateCuidador/${id}`, formData);
  return response.data;
};

const cuidadorService = {
  createCuidador,
  getCuidadores,
  getCuidador,
  deleteCuidador,
  updateCuidador,
};

export default cuidadorService;