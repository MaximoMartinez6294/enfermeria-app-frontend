import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import productService from "../../../redux/features/product/productService";
import { toast } from "react-toastify";
import cuidadorService from "../../../redux/features/cuidadores/cuidadoresService"; // Importa el servicio de cuidadores
import enfermeroService from "../../../redux/features/enfermero/enfermeroService"
import "../productForm/ProductForm copy.scss";

const ProductFormCopy = ({ productToEdit }) => {
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
  console.log("productToEdit en EditProduct:", productToEdit);

  
  const [cuidadoresList, setCuidadoresList] = useState([]); // Lista de cuidadores
  const [enfermerosList, setEnfermerosList] = useState([]); // Lista de enfermeros


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

  useEffect(() => {
    if (productToEdit) {
      // Si hay un producto para editar, establece los valores del formulario con los datos del producto
      setProduct({
        name: productToEdit.name || "",
        estado: productToEdit.estado || "",
        direccion: productToEdit.direccion || "",
        telefono: productToEdit.telefono || "",
        horasDeCuidador: productToEdit.horasDeCuidador || "",
        turnos: productToEdit.turnos || "",
        cuidadores: productToEdit.cuidadores || "",
        ved: productToEdit.ved || "",
        enfermeros: productToEdit.enfermeros || "",
        observaciones: productToEdit.observaciones || "",
        insumos: productToEdit.insumos || "",
      });
    }
  }, [productToEdit]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const updateProduct = async (event) => {
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
        cuidadores: cuidadoresArray,
        ved: product.ved,
        enfermeros: enfermerosArray,
        observaciones: product.observaciones,
        insumos: product.insumos,
      };

      if (productToEdit) {
        // Si estamos editando un producto, utiliza productService.updateProduct
        const response = await productService.updateProduct(productToEdit._id, formData);
        console.log('Respuesta del servidor (actualización):', response);
        toast.success("El paciente se ha actualizado con éxito");
      } else {
        toast.error("No se ha proporcionado un producto para editar.");
      }

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
    } catch (error) {
      // Manejar los errores, como mostrar un mensaje de error
      console.error('Error al enviar el formulario:', error);
      toast.error("Hubo un error al actualizar el paciente");
    }
  };

  return (
    <div className="update-product">
    <Card cardClass={"card"}>
      <form onSubmit={updateProduct}>
        <label>Nombre del pacientes:</label>
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


ProductFormCopy.modules = {
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
ProductFormCopy.formats = [
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

export default ProductFormCopy;
