import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import enfermeroService from "../../../redux/features/enfermero/enfermeroService";
import { toast } from "react-toastify";

import "../enfermeroForm/enfermeroForm.scss";

const EnfermeroForm = () => {
  const [enfermero, setEnfermero] = useState({
    name: "",
    telefono: "",
    paciente: "",
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEnfermero({ ...enfermero, [name]: value });
  };

  const saveCuidador = async (event) => {
    event.preventDefault();

    try {
      // Recopilar los datos del formulario en un objeto formData
      const formData = {
        name: enfermero.name,
        telefono: enfermero.telefono,
        paciente: enfermero.paciente,
      };

      console.log("Datos del formulario:", formData);

      // Llamar a createProduct para enviar los datos al servidor
      const response = await enfermeroService.createEnfermero(formData);

      // Manejar la respuesta del servidor (puede ser una notificación de éxito)
      console.log('Respuesta del servidor:', response);

      // Limpiar el formulario o realizar cualquier otra acción después de guardar
      setEnfermero({
        name: "",
        telefono: "",
        paciente: "",
      });

      // Mostrar una notificación de éxito
      toast.success("El enfermero se ha creado con éxito");
    } catch (error) {
      // Manejar los errores, como mostrar un mensaje de error
      console.error('Error al enviar el formulario:', error);

      // Mostrar una notificación de error
      toast.error("Hubo un error al crear el enfermero");
    }
  };

  return (
    <div className="add-enfermero">
    <Card cardClass={"card"}>
      <form onSubmit={saveCuidador}>
        <label>Nombre del enfermero:</label>
        <input
          type="text"
          placeholder="Nombre de paciente"
          name="name"
          value={enfermero?.name}
          onChange={handleInputChange}
        />

          <label> Telefono: </label>
        <input
          type="text"
          placeholder="Telefono"
          name="telefono"
          value={enfermero?.telefono}
          onChange={handleInputChange}
        /> 

          <label>Paciente:</label>
        <input
          type="text"
          placeholder="Paciente"
          name="paciente"
          value={enfermero?.insumos}
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


EnfermeroForm.modules = {
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
EnfermeroForm.formats = [
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

export default EnfermeroForm;