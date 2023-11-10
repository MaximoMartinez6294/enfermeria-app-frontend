import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CuidadorFormCopy from "../../components/cuidadores/cuidadoresForm/cuidadorForm copy";
import {
  getCuidador,
  getCuidadores,
  selectIsLoading,
  selectCuidador,
  updateCuidador,
} from "../../redux/features/cuidadores/cuidadorSlice";

const EditCuidador = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  // Agrega este console.log para verificar que el ID se está obteniendo correctamente.
  console.log("ID del CUIDADOR a editar:", id);

  const cuidadorEdit = useSelector(selectCuidador);

  // Agrega este console.log para verificar los datos del producto que se está editando.
  console.log("Datos del cuidador a editar:", cuidadorEdit);

  const [cuidador, setCuidador] = useState(cuidadorEdit);

  const [, setDescription] = useState("");

  useEffect(() => {
    // Agrega este console.log para verificar que se esté realizando la solicitud para obtener el producto.
    console.log("Obteniendo cuidador para editar...");
    dispatch(getCuidador(id));
  }, [dispatch, id]);

  useEffect(() => {
    setDescription(cuidadorEdit && cuidadorEdit.description ? cuidadorEdit.description : "");
  }, [cuidadorEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCuidador({ ...cuidador, [name]: value });
  };

  const saveCuidador = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", cuidador?.name);
    formData.append("telefono", cuidador?.telefono);
    formData.append("observaciones", cuidador?.observaciones);
    formData.append("paciente", cuidador?.paciente);

    // Agrega este console.log para verificar los datos que se están enviando al servidor.
    console.log("Datos del formulario que se enviarán al servidor:", formData);

    await dispatch(updateCuidador({ id, formData }));
    await dispatch(getCuidadores());
    navigate("/dashboard2");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Editar Cuidador</h3>
      <CuidadorFormCopy
      cuidadorToEdit={cuidadorEdit}
      cuidador={cuidador}
      handleInputChange={handleInputChange}
      saveCuidador={saveCuidador}
      />
    </div>
  );
};

export default EditCuidador;
