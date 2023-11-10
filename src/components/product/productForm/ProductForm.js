

import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import productService from "../../../redux/features/product/productService";
import { toast } from "react-toastify";

import "./ProductForm.scss";

const ProductForm = () => {
  const [product, setProduct] = useState({
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
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = async (event) => {
    event.preventDefault();

    try {
      // Recopilar los datos del formulario en un objeto formData
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

      console.log("Datos del formulario:", formData);

      // Llamar a createProduct para enviar los datos al servidor
      const response = await productService.createProduct(formData);

      // Manejar la respuesta del servidor (puede ser una notificación de éxito)
      console.log('Respuesta del servidor:', response);

      // Limpiar el formulario o realizar cualquier otra acción después de guardar
      setProduct({
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
      });

      // Mostrar una notificación de éxito
      toast.success("El paciente se ha creado con éxito");
    } catch (error) {
      // Manejar los errores, como mostrar un mensaje de error
      console.error('Error al enviar el formulario:', error);

      // Mostrar una notificación de error
      toast.error("Hubo un error al crear el paciente");
    }
  };

  return (
    <div className="add-product">
    <Card cardClass={"card"}>
      <form onSubmit={saveProduct}>
        <label>Nombre del paciente:</label>
        <input
          type="text"
          placeholder="Nombre de paciente"
          name="name"
          value={product?.name}
          onChange={handleInputChange}
        />

         <label> Estado: </label>
        <input
          type="text"
          placeholder="Estado"
          name="estado"
          value={product?.estado}
          onChange={handleInputChange}
        />

          <label> Dirección: </label>
        <input
          type="text"
          placeholder="Dirección"
          name="direccion"
          value={product?.direccion}
          onChange={handleInputChange}
        />

          <label> Telefono: </label>
        <input
          type="text"
          placeholder="Telefono"
          name="telefono"
          value={product?.telefono}
          onChange={handleInputChange}
        /> 

         <label> Horas De Cuidador: </label>
        <input
          type="text"
          placeholder="Horas De Cuidador"
          name="horasDeCuidador"
          value={product?.horasDeCuidador}
          onChange={handleInputChange}
        />

        <label> Turnos:</label>
        <input
          type="text"
          placeholder="Turnos"
          name="turnos"
          value={product?.turnos}
          onChange={handleInputChange}
        />
          <label> Cuidadores:</label>
        <input
          type="text"
          placeholder="cuidadores"
          name="cuidadores"
          value={product?.cuidadores}
          onChange={handleInputChange}
        />

          <label>Ved:</label>
        <input
          type="text"
          placeholder="Visitas enfermeras diarias"
          name="ved"
          value={product?.ved}
          onChange={handleInputChange}
        />

          <label>Enfermeros:</label>
        <input
          type="text"
          placeholder="Enfermeros"
          name="enfermeros"
          value={product?.enfermeros}
          onChange={handleInputChange}
        />

          <label>Observaciones</label>
        <input
          type="text"
          placeholder="Observaciones"
          name="observaciones"
          value={product?.observaciones}
          onChange={handleInputChange}
        />

          <label>Insumos:</label>
        <input
          type="text"
          placeholder="Insumos"
          name="insumos"
          value={product?.insumos}
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


ProductForm.modules = {
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
ProductForm.formats = [
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

export default ProductForm;
