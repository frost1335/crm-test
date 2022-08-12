import { Box, Drawer, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useCreateAdminMutation,
  useEditAdminMutation,
} from "../../services/adminApi";

import "./Drawer.scss";

const UserDrawer = ({ title, toggleDrawer, drawer, admin, setDrawer }) => {
  const [editAdmin] = useEditAdminMutation();
  const [createAdmin] = useCreateAdminMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userImg, setUserImg] = useState("");
  const [password, setPassword] = useState("123456");
  const [newPassword, setNewPassword] = useState("123456");

  useEffect(() => {
    setFirstName(admin?.firstName || "");
    setLastName(admin?.lastName || "");
    setUsername(admin?.username || "");
    setPhoneNumber(admin?.phoneNumber || "");
    setUserImg(admin?.userImg || "");
  }, [admin]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setDrawer({ drawer: false });

    if (admin) {
      const data = new FormData();

      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("username", username);
      data.append("phoneNumber", phoneNumber);
      data.append("userImg", userImg);
      data.append("password", password);
      data.append("newPassword", newPassword);
      data.append("_id", admin._id);
      editAdmin(data);
    } else {
      const data = new FormData();
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("username", username);
      data.append("phoneNumber", phoneNumber);
      data.append("userImg", userImg);
      data.append("password", password);
      data.append("newPassword", newPassword);

      createAdmin(data);
    }
    clean();
  };

  const clean = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setUserImg("");
    setUsername("");
  };

  return (
    <div className="drawer">
      <Drawer
        anchor={"right"}
        open={drawer?.drawer}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 350,
          }}
          role="presentation"
        >
          <div className="drawer-box">
            <div className="drawer-header">
              <h3>{title}</h3>
              <button onClick={toggleDrawer(false)}>
                <i className="fal fa-times" />
              </button>
            </div>
            <form className="drawer-form" onSubmit={onSubmitHandler}>
              <div className="input-text-form">
                <TextField
                  label="Ism"
                  value={firstName}
                  variant="outlined"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Familiya"
                  value={lastName}
                  variant="outlined"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Username"
                  value={username}
                  variant="outlined"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Telefon"
                  value={phoneNumber}
                  variant="outlined"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Parol"
                  type="password"
                  value={password}
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Yangi parol"
                  type="password"
                  value={newPassword}
                  variant="outlined"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Rasm"
                  variant="outlined"
                  value={userImg.filename}
                  type="file"
                  onChange={(e) => setUserImg(e.target.files[0])}
                />
              </div>
              <div className="form-button">
                <button type="submit">Jo'natish</button>
              </div>
            </form>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default UserDrawer;
