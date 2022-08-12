import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
    if (!token) {
      return navigate("/auth/login");
    } else {
      return navigate("/dashboard");
    }
  }, [navigate, token]);

  return <div>NotFound </div>;
};

export default NotFound;
