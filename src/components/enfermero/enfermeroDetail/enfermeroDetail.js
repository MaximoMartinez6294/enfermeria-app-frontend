import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getEnfermero } from "../../../redux/features/enfermero/enfermeroSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./enfermeroDetail.scss";

const EnfermeroDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
   // Obtén el estado de Redux relacionado con el producto
   const { enfermero, isLoading, isError, message } = useSelector(
    (state) => state.enfermero
  );

  console.log("ID del paciente:", id);

  useEffect(() => { 
    if (isLoggedIn === true) {
      dispatch(getEnfermero(id))
        .then((response) => {
          // Imprime la respuesta en la consola
          console.log("Respuesta de getEnfermero:", response);
        })
        .catch((error) => {
          console.error("Error al obtener el enfermero:", error);
        });
    }
  
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="cuidadores-detail">
      <h3 className="--mt">Detalle del cuidador</h3>
      <Card cardClass="card">
      {isLoading && <SpinnerImg />}
{enfermero ? (
          <div className="detail">

            <h4>
              <span className="badge">Nombre: </span> &nbsp; {enfermero.name}
            </h4>
            <p>
              <b>&rarr; telefono  : </b> {enfermero.telefono}
            </p>
            <p>
              <b>&rarr; paciente : </b> {enfermero.paciente}
            </p>

            <hr />
            <hr />
            <code className="--color-dark">
              Creado en: {enfermero.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Ultima actualización: {enfermero.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        ) : isError ? (
          <p>Error: {message}</p>
        ) : (
          <p>El enfermero  no se encontró o está en blanco.</p>
        )}
      </Card>
    </div>
  );
};

export default EnfermeroDetail;