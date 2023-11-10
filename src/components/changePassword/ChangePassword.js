import React, { useState } from "react";
import "./ChangePassword.scss";
import { toast } from "react-toastify";
import { changePassword } from "../../services/authService";
import Card from "../card/Card";
import { useNavigate } from "react-router-dom";

const initialState = {
    oldPassword: "",
    password: "",
    password2: "",
  };
  
  const ChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setformData] = useState(initialState);
    const { oldPassword, password, password2 } = formData;
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setformData({ ...formData, [name]: value });
    };
  
    const changePass = async (e) => {
      e.preventDefault();
  
      if (password !== password2) {
        return toast.error("Las nuevas contraseñas no coinciden");
      }
  
      const formData = {
        oldPassword,
        password,
      };
  
      const data = await changePassword(formData);
      toast.success(data);
      navigate("/profile");
    };
  
    return (
      <div className="change-password">
        <Card cardClass={"password-card"}>
          <h3>Cambiar contraseña</h3>
          <form onSubmit={changePass} className="--form-control">
            <input
              type="password"
              placeholder="Contraseña antigua"
              required
              name="oldPassword"
              value={oldPassword}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Nueva contraseña"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirmar nueva contraseña"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary">
              Change Password
            </button>
          </form>
        </Card>
      </div>
    );
  };
  
  export default ChangePassword;