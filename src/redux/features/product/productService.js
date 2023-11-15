import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;

// Create New Product
const createProduct = async ( formData) => {
  try {
    const response = await axios.post(`${API_URL}add-product`, formData);
    // Agrega un mensaje de registro para mostrar la respuesta del servidor
    console.log('Respuesta del servidor al crear el producto:', response);

    // Maneja la respuesta del servidor
    console.log('Producto creado:', response.data);
    return response.data;
  } catch (error) {
    // Maneja los errores, si los hay
    console.error('Error al crear el producto:', error);
    throw error;
  }
};

console.log('API_URL:', API_URL);


// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}updateProduct/${id}`, formData);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

export default productService;