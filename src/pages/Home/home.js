import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import logo from "../../assets/logo-white.png";
import heroImg from "../../assets/undraw_doctors_p6aq (2).svg";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";


const Home = () => {
    return (
      <div className="home">
        <nav className="container ">
          <div className="logo">
            <img className="logo1" src={logo} alt="logo" />
          </div>
  
          <ul className="home-links">
            <ShowOnLogout>
              <li>
                <Link to="/register">Registrar</Link>
              </li>
            </ShowOnLogout>
            <ShowOnLogout>
              <li>
                <button className="--btn --btn-primary ">
                  <Link to="/login">Acceder</Link>
                </button>
              </li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li>
                <button className="--btn --btn-primary">
                  <Link to="/dashboard">Panel</Link>
                </button>
              </li>
            </ShowOnLogin>
          </ul>
        </nav>
        {/* HERO SECTION */}
        <section className="container hero">
          <div className="hero-text">
            <h2>Inventario {"&"} Almacenamiento de datos</h2>
            <p>
            Sistema de inventario para controlar y gestionar los pacientes en tiempo real e integrado para facilitar el desarrollo de tu negocio.
            </p>
            <div className="hero-buttons">
              <button className="--btn --btn-secondary">
                <Link to="/dashboard">Pruebalo ya!</Link>
              </button>
            </div>
            <div className="--flex-start">
              <NumberText num="1K" text="Propietarios de marca" />
              <NumberText num="2K" text="Usuarios Activos" />
              <NumberText num="500+" text="Socios" />
            </div>
          </div>
  
          <div className="hero-image">
            <img src={heroImg} alt="Inventory" />
          </div>
        </section>
      </div>
    );
  };
  
  const NumberText = ({ num, text }) => {
    return (
      <div className="--mr">
        <h3 className="--color-white">{num}</h3>
        <p className="--color-white">{text}</p>
      </div>
    );
  };
  
  export default Home;