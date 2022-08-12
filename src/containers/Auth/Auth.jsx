import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Auth.scss";
import { changeLogo } from "../../images";
import { BASE_URL } from "../../constants";

const Auth = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const data = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          phoneNumber: phone,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.data.token);
      if (data.data.status === "teacher") {
        navigate("/groups", { state: { status: "teacher" } });
      }
      if (data.data.status === "admin") {
        navigate("/dashboard");
      }
    } catch (e) {
      setError(e?.response?.data);
      setTimeout(() => {
        setError("");
      }, 3500);
    }
  };

  return (
    <div className="auth">
      <div className="auth-box">
        <div className="auth-header">
          <img
            src="https://images.unsplash.com/photo-1626495121472-477b55186c0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="auth-img"
          />
        </div>
        <div className="auth-body">
          <div className="body-left">
            <div className="left-img">
              <img src={changeLogo} alt="auth-img" />
            </div>
          </div>
          <div className="body-right">
            <h3>Login</h3>
            <span className="error-msg">{error} </span>
            <form className="auth-form" onSubmit={onSubmitHandler}>
              <TextField
                className="auth-input"
                id="phone-input-id"
                label="Telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                variant="outlined"
              />
              <TextField
                className="auth-input"
                id="password-input-id"
                label="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                variant="outlined"
              />
              <div className="form-button">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
