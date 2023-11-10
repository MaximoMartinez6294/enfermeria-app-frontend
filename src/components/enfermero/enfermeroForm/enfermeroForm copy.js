import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import enfermeroService from "../../../redux/features/enfermero/enfermeroService";
import { toast } from "react-toastify";

import "../enfermeroForm/enfermeroFormCopy.scss";

const EnfermeroFormCopy = ({ enfermeroToEdit }) => {
  const [enfermero, setEnfermero] = useState({
    name: "",
    telefono: "",
    paciente: "",
  });
  console.log("enfermeroToEdit en EditEnfermero:", enfermeroToEdit);

  useEffect(() => {
    if (enfermeroToEdit) {
      // Si hay un cuidador para editar, establece los valores del formulario con los datos del cuidador
      setEnfermero({
        name: enfermeroToEdit.name || "",
        telefono: enfermeroToEdit.telefono || "", // Cambia cuidadorToEdit.name por cuidadorToEdit.telefono
        paciente: enfermeroToEdit.paciente || "", // Cambia cuidadorToEdit.name por cuidadorToEdit.paciente
      });
    }
  }, [enfermeroToEdit]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEnfermero({ ...enfermero, [name]: value });
  };

  const updateEnfermero = async (event) => {
    event.preventDefault();

    try {
      // Recopilar los datos del formulario en un objeto formData
      const formData = {
        name: enfermero.name,
        telefono: enfermero.telefono,
        paciente: enfermero.paciente,
      };

      if (enfermeroToEdit) {
        // Si estamos editando un producto, utiliza productService.updateProduct
        const response = await enfermeroService.updateEnfermero(enfermeroToEdit._id, formData);
        console.log('Respuesta del servidor (actualización):', response);
        toast.success("El enfermero se ha actualizado con éxito");
      } else {
        toast.error("No se ha proporcionado un enfermero para editar.");
      }

      // Limpiar el formulario o realizar cualquier otra acción después de guardar
      setEnfermero({
        name: "",
        telefono: "",
        paciente: "",
      });
    } catch (error) {
      // Manejar los errores, como mostrar un mensaje de error
      console.error('Error al enviar el formulario:', error);
      toast.error("Hubo un error al actualizar el enfermero");
    }
  };

  return (
    <div className="update-enfermero">
    <Card cardClass={"card"}>
      <form onSubmit={updateEnfermero}>
        <label>Nombre del cuidaor:</label>
        <input
          type="text"
          placeholder="Nombre del cuidador"
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
          value={enfermero?.paciente}
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


EnfermeroFormCopy.modules = {
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
EnfermeroFormCopy.formats = [
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

export default EnfermeroFormCopy;