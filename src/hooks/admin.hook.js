import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../constants";

export const useAdminStatus = () => {
  const [admin, setAdmin] = useState(() => null);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    const handleSetAdmin = (admin) => {
      setAdmin((prevData) => ({ ...admin }));
    };

    const fetchAdmin = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          withCredentials: true,
        };
        const { data } = await axios.get(`${BASE_URL}/api/dashboard`, config);
        if (!unmounted) {
          handleSetAdmin(data);
        }
      } catch (e) {
        if (e?.response?.data !== "THROW NEW ERROR: Error: Not authenticated") {
          localStorage.removeItem("authToken");
        }
      }
    };

    fetchAdmin();

    return () => {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  return admin;
};
