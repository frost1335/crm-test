import React from "react";
import classes from "./Navbar.module.scss";
import logo from "./change_it_logo_black.png";
import User from "./User/User";
import NavbarSearch from "./NavbarSearch/NavbarSearch";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className={classes.Navbar}>
      <NavbarSearch
        onChange={props.onChangeHandler}
        filteredData={props.filteredData}
        bgSearch={props.bgSearch}
        search={props.search}
        setSearch={props.setSearch}
        setBgSearch={props.setBgSearch}
        isLoading={props.isLoading}
      />
      <Link to="/dashboard" className={classes.logo}>
        <img src={logo} alt="png" />
      </Link>
      <User dropHandler={props.dropHandler} isShow={props.isShow} />
    </nav>
  );
};

export default Navbar;
