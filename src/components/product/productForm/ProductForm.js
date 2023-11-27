import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import productService from "../../../redux/features/product/productService";
import cuidadorService from "../../../redux/features/cuidadores/cuidadoresService"; // Importa el servicio de cuidadores
import enfermeroService from "../../../redux/features/enfermero/enfermeroService"
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
    cuidadores: "", // Cambiar esto a un campo de selección (dropdown)
    ved: "",
    enfermeros: "", // Cambiar esto a un campo de selección (dropdown)
    observaciones: "",
    insumos: "",
  });
  


  const [cuidadoresList, setCuidadoresList] = useState([]); // Lista de cuidadores
  const [enfermerosList, setEnfermerosList] = useState([]); // Lista de enfermeros

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  // Cargar la lista de cuidadores y enfermeros cuando se monta el componente
  useEffect(() => {
    const fetchCuidadores = async () => {
      try {
        const response = await cuidadorService.getCuidadores();
        setCuidadoresList(response);
      } catch (error) {
        console.error("Error al cargar la lista de cuidadores:", error);
      }
    };

    const fetchEnfermeros = async () => {
      try {
        const response = await enfermeroService.getEnfermeros();
        setEnfermerosList(response);// Aquí debes hacer lo mismo para cargar la lista de enfermeros
      } catch (error) {
        console.error("Error al cargar la lista de enfermeros:", error);
      }
    };
    fetchCuidadores();
    fetchEnfermeros();
  }, []); // El segundo argumento [] garantiza que esto solo se ejecute una vez al montar el componente

  const saveProduct = async (event) => {
    event.preventDefault();

    const cuidadoresArray = Array.isArray(product.cuidadores)
  ? product.cuidadores.map((cuidador) => cuidador.name)
  : [product.cuidadores];

const enfermerosArray = Array.isArray(product.enfermeros)
  ? product.enfermeros.map((enfermero) => enfermero.name)
  : [product.enfermeros];

  try {
    // Recopilar los datos del formulario en un objeto formData
    const formData = {
      name: product.name,
      estado: product.estado,
      direccion: product.direccion,
      telefono: product.telefono,
      horasDeCuidador: product.horasDeCuidador,
      turnos: product.turnos,
      cuidadores: cuidadoresArray, // Mapear a objetos con el campo 'name'
      ved: product.ved,
      enfermeros: enfermerosArray, // Mapear a objetos con el campo 'name'
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

          <label>Cuidadores:</label>
          <select
            name="cuidadores"
            value={product?.cuidadores}
            onChange={handleInputChange}
          >
            <option value="">Selecciona un cuidador</option>
            {cuidadoresList.map((cuidador) => (
              <option key={cuidador.id} value={cuidador.id}>
                {cuidador.name}
              </option>
            ))}
          </select>

          <label>Ved:</label>
          <input
            type="text"
            placeholder="Visitas enfermeras diarias"
            name="ved"
            value={product?.ved}
            onChange={handleInputChange}
          />

          <label>Enfermeros:</label>
          <select
            name="enfermeros"
            value={product?.enfermeros}
            onChange={handleInputChange}
          >
            <option value="">Selecciona un enfermero</option>
            {enfermerosList.map((enfermero) => (
              <option key={enfermero.id} value={enfermero.id}>
                {enfermero.name}
              </option>
            ))}
         </select>

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
