import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CuidadorForm from "../../components/cuidadores/cuidadoresForm/cuidadorForm";
import {
  createCuidador,
  selectIsLoading,
} from "../../redux/features/cuidadores/cuidadorSlice";

const initialState = {
  name: "",
  telefono: "",
  observaciones: "", 
  paciente: "",
};

const AddCuidador = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cuidador, setCuidador] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const { 
  name,
  telefono,
  observaciones, 
  paciente,
 } = cuidador;

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setCuidador({ ...cuidador, [name]: value });
};

  

  const saveCuidador = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("telefono", telefono);
    formData.append("observaciones", observaciones);
    formData.append("paciente", paciente);

    console.log(...formData);

    await dispatch(createCuidador(formData));

    navigate("/dashboard2");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Agrega nuevo cuidador</h3>
      <CuidadorForm
        cuidador={cuidador}
        handleInputChange={handleInputChange}
        saveCuidador={saveCuidador}
      />
    </div>
  );
};

export default AddCuidador;