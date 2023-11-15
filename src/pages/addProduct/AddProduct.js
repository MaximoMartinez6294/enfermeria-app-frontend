import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm.js";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";

const initialState = {
  name: "",
  estado: "",
  direccion: "",
  telefono: "",
  horasDeCuidador: "", 
  turnos: "", 
  cuidadores: "", 
  ved: "", 
  enfermeros: "", 
  observaciones: "", 
  insumos: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      // Crear un objeto con los datos del producto
      const formData = {
        name: product.name,
        estado: product.estado,
        direccion: product.direccion,
        telefono: product.telefono,
        horasDeCuidador: product.horasDeCuidador,
        turnos: product.turnos,
        cuidadores: product.cuidadores,
        ved: product.ved,
        enfermeros: product.enfermeros,
        observaciones: product.observaciones,
        insumos: product.insumos,
      };

      // Enviar el objeto directamente a través de dispatch
      await dispatch(createProduct(formData));

      navigate("/dashboard");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Agrega nuevo paciente</h3>
      <ProductForm
        product={product}
        handleInputChange={handleInputChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;