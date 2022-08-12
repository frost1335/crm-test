import React from "react";
import classes from "./User.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import { Link } from "react-router-dom";
import { useAdminStatus } from "../../../hooks/admin.hook";

const User = (props) => {
  const navigate = useNavigate();
  const admin = useAdminStatus();

  const logoutHandler = async () => {
    localStorage.removeItem("authToken");
    navigate("/auth/login");
    await axios.get(`${BASE_URL}/api/auth/logout`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  if (admin == null || admin === undefined) return <div>User</div>;

  return (
    <div className={classes.user}>
      <div className={classes.dropdown}>
        <button onClick={props.dropHandler}>
          <span>
            {admin?.firstName} {admin?.lastName}
          </span>
          <span>
            <img
              src={`${BASE_URL}/Uploads/${admin?.img || admin?.userImg}`}
              alt="png"
            />
          </span>
        </button>
        {props.isShow ? (
          <ul className={classes.dropdownMenu}>
            <li>
              <Link
                to="/user/profile"
                onClick={props.dropHandler}
                className={classes.dropdownItem}
              >
                Akkaunt
              </Link>
            </li>
            <li>
              <hr />
            </li>
            <li>
              <button onClick={logoutHandler} className={classes.dropdownItem}>
                Chiqish
              </button>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default User;
