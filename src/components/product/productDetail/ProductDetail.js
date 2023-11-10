import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
   // Obtén el estado de Redux relacionado con el producto
   const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  console.log("ID del paciente:", id);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id))
        .then((response) => {
          // Imprime la respuesta en la consola
          console.log("Respuesta de getProduct:", response);
        })
        .catch((error) => {
          console.error("Error al obtener el producto:", error);
        });
    }
  
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Detalle del paciente</h3>
      <Card cardClass="card">
      {isLoading && <SpinnerImg />}
{product ? (
          <div className="detail">

            <h4>Paciente: {(product.estado )}</h4 >
            <hr />
            <h4>
              <span className="badge">Nombre: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; Estado : </b> {product.estado}
            </p>
            <p>
              <b>&rarr; HorasDeCuidador : </b> 
              {product.horasDeCuidador}
            </p>
            <p>
              <b>&rarr; Turnos  : </b> {product.turnos}
            </p>
            <p>
              <b>&rarr; cuidadores  : </b> {product.cuidadores}
            </p>
            <p>
              <b>&rarr; ved  : </b> {product.ved}
            </p>
            <p>
              <b>&rarr; enfermeros  : </b> {product.enfermeros}
            </p>
            <p>
              <b>&rarr; observaciones  : </b> {product.observaciones}
            </p>
            <p>
              <b>&rarr; insumos  : </b> {product.insumos}
            </p>

            <hr />
            <hr />
            <code className="--color-dark">
              Creado en: {product.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
            Ultima actualización: {product.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        ) : isError ? (
          <p>Error: {message}</p>
        ) : (
          <p>El paciente no se encontró o está en blanco.</p>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;