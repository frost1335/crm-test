import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { Loader, TabPanel } from "../../components";
import { artist3d } from "../../images";
import { useNavigate } from "react-router-dom";

import "./UserProfile.scss";
import { UserDrawer } from "../../components/Drawers";
import { useGetAdminQuery } from "../../services/adminApi";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UserProfile = () => {
  const navigate = useNavigate();
  const { data: admin, isLoading, isError } = useGetAdminQuery();
  const [value, setValue] = React.useState(0);
  const [drawer, setDrawer] = React.useState({ drawer: false });

  const toggleDrawer = (open) => (event) => {
    setDrawer({ drawer: open });
  };

  useEffect(() => {
    if (isError) {
      document.cookie = 'authToken=""';
    }
  }, [navigate, drawer, isError]);

  if (!admin && isLoading) return <Loader />;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <UserDrawer
        title={"Foydalanuvchini o'zgartirish"}
        setDrawer={setDrawer}
        drawer={drawer}
        toggleDrawer={toggleDrawer}
        admin={admin}
      />
      <div className="user-profile">
        <h2 className="profile-title">{admin?.firstName}</h2>

        <div className="profile-body">
          <Box
            className="profile-tab"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Profil" {...a11yProps(0)} />
              <Tab label="Parol" {...a11yProps(1)} />
              <Tab label="Settings" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="profile-box">
              <div className="profile-img">
                <img src={artist3d} alt="profile-img" />
              </div>
              <div className="profile-body">
                {admin.status === "admin" ? (
                  <div className="edit-button">
                    <button onClick={toggleDrawer(true)}>
                      <i className="fal fa-pen" />
                    </button>
                  </div>
                ) : null}
                <h3>{admin?.name}</h3>
                <h4>
                  Telefon: <span>{admin?.phoneNumber}</span>
                </h4>
                <h4>
                  Rollar:
                  <div className="tags">
                    <span className="tab">Administrator</span>
                  </div>
                </h4>
                <h4>
                  Filiallar:
                  <div className="tags">
                    <span className="tab">Change IT academy</span>
                  </div>
                </h4>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
