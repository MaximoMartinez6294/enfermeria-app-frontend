
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home.js";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard.js";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct.js";
import AddCuidador from "./pages/addCuidador/addCuidador.js"
import AddEnfermero from "./pages/addEnfermero/addEnfermero.js"
import ProductDetail from "./components/product/productDetail/ProductDetail";
import CuidadorDetail from "./components/cuidadores/cuidadoresDetail/cuidadoresDetail.js"
import EnfermeroDetail from "./components/enfermero/enfermeroDetail/enfermeroDetail.js"
import EditProduct from "./pages/editProduct/EditProduct";
import EditCuidador from "./pages/editCuidador/editCuidador.js";
import EditEnfermero from "./pages/editEnfermero/editEnfermero.js";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Dashboard2 from "./pages/dashboard2/dashboard2.js";
import Dashboard3 from "./pages/dashboard3/dashboard3.js";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/dashboard2"
          element={
            <Sidebar>
              <Layout>
                <Dashboard2 />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/dashboard3"
          element={
            <Sidebar>
              <Layout>
                <Dashboard3 />
              </Layout>
            </Sidebar>
          }
        />


        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/add-enfermero"
          element={
            <Sidebar>
              <Layout>
                <AddEnfermero />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/add-cuidador"
          element={
            <Sidebar>
              <Layout>
                <AddCuidador />
              </Layout>
            </Sidebar>
          }
        />
        
        <Route
          path="/product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/enfermero-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <EnfermeroDetail />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/cuidador-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <CuidadorDetail />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/edit-cuidador/:id"
          element={
            <Sidebar>
              <Layout>
                <EditCuidador />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/edit-enfermero/:id"
          element={
            <Sidebar>
              <Layout>
                <EditEnfermero />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
