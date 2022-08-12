import React, { useEffect, useState } from "react";
import "./MenuList.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constants";

const MenuList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await axios.get(`${BASE_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          withCredentials: true,
        });
        setAdmin(data.data);
      } catch (e) {
        localStorage.removeItem("authToken");
        setError(e.message);
        setTimeout(() => {
          setError("");
        }, 3500);
        navigate("/auth/login");
      }
    };

    fetchDashboard();
  }, []);

  const check = (path) => {
    return (
      location.pathname.split("/").includes(path) &&
      location.search.replace("?", "") !== "settings"
    );
  };

  const menuContents = [
    {
      icon: <i className={`fal fa-user menuIcon`} />,
      text: "Lidlar",
      path: "/leads",
      active: check("leads") ? "active" : "",
      allow: ["admin"],
    },
    {
      icon: <i className={`fal fa-chalkboard-teacher menuIcon`} />,
      text: "O'qituvchilar",
      path: "/teachers",
      active: check("teachers") ? "active" : "",
      allow: ["admin"],
    },
    {
      icon: <i className={`fal fa-layer-group menuIcon`} />,
      text: "Guruhlar",
      path: "/groups",
      active: check("groups") ? "active" : "",
      allow: ["teacher", "admin"],
    },
    {
      icon: <i className={`fal fa-graduation-cap menuIcon`} />,
      text: "Talabalar",
      path: "/students",
      active: check("students") ? "active" : "",
      allow: ["admin"],
    },
    {
      icon: <i className={`fal fa-university menuIcon`} />,
      text: "Kurslar",
      path: "/courses",
      active: check("courses") ? "active" : "",
      allow: ["admin"],
    },
    // {
    //   icon: <i className={`fal fa-coins menuIcon`} />,
    //   text: "Moliya",
    //   path: "/finance",
    //   active: check("finance") ? "active" : "",
    //   allow: ["admin"],
    // },
    // {
    //   icon: <i className={`fal fa-analytics menuIcon`} />,
    //   text: "Hisobotlar",
    //   path: "/analytics",
    //   active: check("analytics") ? "active" : "",
    //   allow: ["admin"],
    // },
    {
      icon: <i className={`fal fa-cog menuIcon`} />,
      text: "Sozlamalar",
      path: "/settings",
      active: location.search.replace("?", "") === "settings" ? "active" : "",
      allow: ["admin"],
    },
  ];

  return (
    <ul className={"menuList"}>
      {menuContents.map((content, idx) => {
        return content.allow.includes(admin?.status) ? (
          content.path === "/settings" ? (
            <li key={idx} className={`menu-item ${content.active}`}>
              <Link to="?settings">
                {content.icon}
                {content.text}
              </Link>
            </li>
          ) : (
            <li key={idx} className={`menu-item ${content.active}`}>
              <Link to={content.path} state={{ status: admin.status }}>
                {content.icon}
                {content.text}
              </Link>
            </li>
          )
        ) : null;
      })}
    </ul>
  );
};

export default MenuList;
