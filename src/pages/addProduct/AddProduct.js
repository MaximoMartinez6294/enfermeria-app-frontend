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

  const { 
  name, 
  estado,
  direccion,
  telefono,
  horasDeCuidador, 
  turnos, 
  cuidadores, 
  ved, 
  enfermeros,
  observaciones,
  insumos,
 } = product;

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setProduct({ ...product, [name]: value });
};

  

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("estado", estado);
    formData.append("direccion", direccion);
    formData.append("telefono", telefono);
    formData.append("horasDeCuidador", horasDeCuidador);
    formData.append("turnos", turnos);
    formData.append("cuidadores", cuidadores);
    formData.append("ved", ved);
    formData.append("enfermeros", enfermeros);
    formData.append("observaciones", observaciones);
    formData.append("insumos", insumos);

    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate("/dashboard");
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