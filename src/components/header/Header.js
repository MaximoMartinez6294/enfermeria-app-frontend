import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";
import "../header/Header.scss"

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector(selectName);
  
    const logout = async () => {
      await logoutUser();
      await dispatch(SET_LOGIN(false));
      navigate("/login");
    };
  
    return (
      <div className="--pad header">
        <div className="--flex-between">
          <h3>
            <span className="--fw-thin">Bienvenido, </span>
            <span className="colorName">{name}</span>
          </h3>
          <button onClick={logout} className="--btn --btn-primary">
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  };
  
  export default Header;