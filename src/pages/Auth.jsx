import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../containers";

const AuthPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  return <>{!token ? <Auth /> : null}</>;
};

export default AuthPage;
