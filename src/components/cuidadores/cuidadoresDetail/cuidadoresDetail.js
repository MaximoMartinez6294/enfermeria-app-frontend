import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getCuidador } from "../../../redux/features/cuidadores/cuidadorSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./cuidadoresDetail.scss";

const CuidadorDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
   // Obtén el estado de Redux relacionado con el producto
   const { cuidador, isLoading, isError, message } = useSelector(
    (state) => state.cuidador
  );

  console.log("ID del cuidador:", id);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getCuidador(id))
        .then((response) => {
          // Imprime la respuesta en la consola
          console.log("Respuesta de getCuidador:", response);
        })
        .catch((error) => {
          console.error("Error al obtener el cuidador:", error);
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
{cuidador ? (
          <div className="detail">

            <h4>
              <span className="badge">Nombre: </span> &nbsp; {cuidador.name}
            </h4>
            <p>
              <b>&rarr; telefono  : </b> {cuidador.telefono}
            </p>
            <p>
              <b>&rarr; observaciones  : </b> {cuidador.observaciones}
            </p>
            <p>
              <b>&rarr; paciente : </b> {cuidador.paciente}
            </p>

            <hr />
            <hr />
            <code className="--color-dark">
              Creado en: {cuidador.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Ultima actualizacion: {cuidador.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        ) : isError ? (
          <p>Error: {message}</p>
        ) : (
          <p>El cuidador no se encontró o está en blanco.</p>
        )}
      </Card>
    </div>
  );
};

export default CuidadorDetail;