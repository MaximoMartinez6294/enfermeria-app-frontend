import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import productService from "../../../redux/features/cuidadores/cuidadoresService";
import { toast } from "react-toastify";

import "../cuidadoresForm/cuidadorForm copy.scss";

const CuidadorFormCopy = ({ cuidadorToEdit }) => {
  const [cuidador, setCuidador] = useState({
    name: "",
    telefono: "",
    observaciones: "",
    paciente: "",
  });
  console.log("cuidadorToEdit en EditCuidador:", cuidadorToEdit);

  useEffect(() => {
    if (cuidadorToEdit) {
      // Si hay un cuidador para editar, establece los valores del formulario con los datos del cuidador
      setCuidador({
        name: cuidadorToEdit.name || "",
        telefono: cuidadorToEdit.telefono || "", // Cambia cuidadorToEdit.name por cuidadorToEdit.telefono
        observaciones: cuidadorToEdit.observaciones || "", // Cambia cuidadorToEdit.name por cuidadorToEdit.observaciones
        paciente: cuidadorToEdit.paciente || "", // Cambia cuidadorToEdit.name por cuidadorToEdit.paciente
      });
    }
  }, [cuidadorToEdit]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCuidador({ ...cuidador, [name]: value });
  };

  const updateCuidador = async (event) => {
    event.preventDefault();

    try {
      // Recopilar los datos del formulario en un objeto formData
      const formData = {
        name: cuidador.name,
        telefono: cuidador.telefono,
        observaciones: cuidador.observaciones,
        paciente: cuidador.paciente,
      };

      if (cuidadorToEdit) {
        // Si estamos editando un producto, utiliza productService.updateProduct
        const response = await productService.updateCuidador(cuidadorToEdit._id, formData);
        console.log('Respuesta del servidor (actualización):', response);
        toast.success("El cuidador se ha actualizado con éxito");
      } else {
        toast.error("No se ha proporcionado un cuidador para editar.");
      }

      // Limpiar el formulario o realizar cualquier otra acción después de guardar
      setCuidador({
        name: "",
        telefono: "",
        observaciones: "",
        paciente: "",
      });
    } catch (error) {
      // Manejar los errores, como mostrar un mensaje de error
      console.error('Error al enviar el formulario:', error);
      toast.error("Hubo un error al actualizar el cuidador");
    }
  };

  return (
    <div className="update-cuidador">
    <Card cardClass={"card"}>
      <form onSubmit={updateCuidador}>
        <label>Nombre del cuidaor:</label>
        <input
          type="text"
          placeholder="Nombre del cuidador"
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
          value={cuidador?.paciente}
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


CuidadorFormCopy.modules = {
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
CuidadorFormCopy.formats = [
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

export default CuidadorFormCopy;
