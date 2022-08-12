import React from "react";
import MenuList from "./MenuList/MenuList";
import classes from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={classes.Sidebar}>
      <div className={classes.sidebarOverlay}></div>
      <div className={classes.mainMenu}>
        <div className={classes.container}>
          <MenuList />
        </div>
      </div>
      <div className={classes.subMenu}></div>
    </div>
  );
};

export default Sidebar;
