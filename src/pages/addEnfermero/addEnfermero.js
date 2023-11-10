import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import EnfermeroForm from "../../components/enfermero/enfermeroForm/enfemeroForm";
import {
    createEnfermero,
    selectIsLoading,
  } from "../../redux/features/enfermero/enfermeroSlice";

const initialState = {
  name: "",
  telefono: "",
  paciente: "",
};

const AddEnfermero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enfermero, setEnfermero] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const { 
  name,
  telefono,
  paciente,
 } = enfermero;

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEnfermero({ ...enfermero, [name]: value });
};

  

  const saveEnfermero = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("telefono", telefono);
    formData.append("paciente", paciente);

    console.log(...formData);

    await dispatch(createEnfermero(formData));

    navigate("/dashboard2");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Agrega nuevo enfermero</h3>
      <EnfermeroForm
        enfermero={enfermero}
        handleInputChange={handleInputChange}
        saveEnfermero={saveEnfermero}
      />
    </div>
  );
};

export default AddEnfermero;