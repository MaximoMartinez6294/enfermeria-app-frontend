import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import EnfermeroFormCopy from "../../components/enfermero/enfermeroForm/enfermeroForm copy";

import {
  getEnfermero,
  getEnfermeros,
  selectIsLoading,
  selectEnfermero,
  updateEnfermero,
} from "../../redux/features/enfermero/enfermeroSlice";

const EditEnfermero = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  // Agrega este console.log para verificar que el ID se está obteniendo correctamente.
  console.log("ID del enfermero a editar:", id);

  const enfermeroEdit = useSelector(selectEnfermero);

  // Agrega este console.log para verificar los datos del producto que se está editando.
  console.log("Datos del enfermero a editar:", enfermeroEdit);

  const [enfermero, setEnfermero] = useState(enfermeroEdit);

  const [, setDescription] = useState("");

  useEffect(() => {
    // Agrega este console.log para verificar que se esté realizando la solicitud para obtener el producto.
    console.log("Obteniendo enfermero para editar...");
    dispatch(getEnfermero(id));
  }, [dispatch, id]);

  useEffect(() => {
    setDescription(enfermeroEdit && enfermeroEdit.description ? enfermeroEdit.description : "");
  }, [enfermeroEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnfermero({ ...enfermero, [name]: value });
  };

  const saveEnfermero = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", enfermero?.name);
    formData.append("telefono", enfermero?.telefono);
    formData.append("paciente", enfermero?.paciente);

    // Agrega este console.log para verificar los datos que se están enviando al servidor.
    console.log("Datos del formulario que se enviarán al servidor:", formData);

    await dispatch(updateEnfermero({ id, formData }));
    await dispatch(getEnfermeros());
    navigate("/dashboard3");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Editar enfermero</h3>
      <EnfermeroFormCopy
      enfermeroToEdit={enfermeroEdit}
      enfermero={enfermero}
      handleInputChange={handleInputChange}
      saveEnfermero={saveEnfermero}
      />
    </div>
  );
};

export default EditEnfermero;