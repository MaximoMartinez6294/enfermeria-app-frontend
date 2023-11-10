import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import cuidadorService from "../../../redux/features/cuidadores/cuidadoresService";
import { toast } from "react-toastify";

import "../cuidadoresForm/cuidadorForm.scss";

const CuidadorForm = () => {
  const [cuidador, setCuidador] = useState({
    name: "",
    telefono: "",
    observaciones: "",
    paciente: "",
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCuidador({ ...cuidador, [name]: value });
  };

  const saveCuidador = async (event) => {
    event.preventDefault();

    try {
      // Recopilar los datos del formulario en un objeto formData
      const formData = {
        name: cuidador.name,
        telefono: cuidador.telefono,
        observaciones: cuidador.observaciones,
        paciente: cuidador.paciente,
      };

      console.log("Datos del formulario:", formData);

      // Llamar a createProduct para enviar los datos al servidor
      const response = await cuidadorService.createCuidador(formData);

      // Manejar la respuesta del servidor (puede ser una notificación de éxito)
      console.log('Respuesta del servidor:', response);

      // Limpiar el formulario o realizar cualquier otra acción después de guardar
      setCuidador({
        name: "",
        telefono: "",
        observaciones: "",
        paciente: "",
      });

      // Mostrar una notificación de éxito
      toast.success("El cuidador se ha creado con éxito");
    } catch (error) {
      // Manejar los errores, como mostrar un mensaje de error
      console.error('Error al enviar el formulario:', error);

      // Mostrar una notificación de error
      toast.error("Hubo un error al crear el cuidador");
    }
  };

  return (
    <div className="add-cuidador">
    <Card cardClass={"card"}>
      <form onSubmit={saveCuidador}>
        <label>Nombre del cuidador:</label>
        <input
          type="text"
          placeholder="Nombre de paciente"
          name="name"
          value={cuidador?.name}
          onChange={handleInputChange}
        />

          <label> Telefono: </label>
        <input
          type="text"
          placeholder="Telefono"
          name="telefono"
          value={cuidador?.telefono}
          onChange={handleInputChange}
        /> 

          <label>Observaciones</label>
        <input
          type="text"
          placeholder="Observaciones"
          name="observaciones"
          value={cuidador?.observaciones}
          onChange={handleInputChange}
        />

          <label>Paciente:</label>
        <input
          type="text"
          placeholder="Paciente"
          name="paciente"
          value={cuidador?.insumos}
          onChange={handleInputChange}
        />
          
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};


CuidadorForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
CuidadorForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default CuidadorForm;