import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList2 from "../../components/product/productList/ProductList2";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";

const Dashboard = () => {
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
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }
  
    if (isError) {
      console.log("Algo salió mal"); // Agrega esto después de la condición isError
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductSummary products={products} cuidadores={cuidadores}  enfermeros={enfermeros}/>
      <ProductList2 products={products} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;