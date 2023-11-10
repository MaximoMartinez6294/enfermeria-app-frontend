import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EnfermeroList from "../../components/enfermero/enfermeroList/enfermeroList";
import EnfermeroSummary from "../../components/enfermero/enfermeroSummary/enfermeroSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getEnfermeros } from "../../redux/features/enfermero/enfermeroSlice";

const Dashboard3 = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, cuidadores,enfermeros, isLoading, isError, message } = useSelector((state) => ({
    products: state.product.products,
    enfermeros: state.enfermero.enfermeros,
    cuidadores: state.cuidador.cuidadores,
    isLoading: state.product.isLoading, // Asegúrate de que las propiedades sean correctas
    isError: state.product.isError,     // Asegúrate de que las propiedades sean correctas
    message: state.product.message      // Asegúrate de que las propiedades sean correctas
  }));
  useEffect(() => {
    console.log("Entrando en useEffect"); // Agrega esto al principio de useEffect

    if (isLoggedIn) {
      dispatch(getEnfermeros());
    }

    if (isError) {
      console.log("Algo salió mal: " + message);
      // Puedes mostrar un mensaje de error en el componente.
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <EnfermeroSummary products={products} cuidadores={cuidadores}  enfermeros={enfermeros} />
      <EnfermeroList enfermeros={enfermeros} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard3;