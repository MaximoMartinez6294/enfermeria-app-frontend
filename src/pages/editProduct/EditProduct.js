import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductFormCopy from "../../components/product/productForm/ProductForm copy";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  // Agrega este console.log para verificar que el ID se está obteniendo correctamente.
  console.log("ID del producto a editar:", id);

  const productEdit = useSelector(selectProduct);

  // Agrega este console.log para verificar los datos del producto que se está editando.
  console.log("Datos del producto a editar:", productEdit);

  const [product, setProduct] = useState(productEdit);

  const [description, setDescription] = useState("");

  useEffect(() => {
    // Agrega este console.log para verificar que se esté realizando la solicitud para obtener el producto.
    console.log("Obteniendo producto para editar...");
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setDescription(productEdit && productEdit.description ? productEdit.description : "");
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("estado", product?.estado);
    formData.append("horasDeCuidador", product?.horasDeCuidador);
    formData.append("turnos", product?.turnos);
    formData.append("description", description);
    formData.append("cuidadores", product?.horasDeCuidador);
    formData.append("ved", product?.ved);
    formData.append("enfermeros", product?.enfermeros);
    formData.append("observaciones", product?.observaciones);
    formData.append("insumos", product?.insumos);

    // Agrega este console.log para verificar los datos que se están enviando al servidor.
    console.log("Datos del formulario que se enviarán al servidor:", formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Editar paciente</h3>
      <ProductFormCopy
        productToEdit={productEdit}
        product={product}
        handleInputChange={handleInputChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default EditProduct;





