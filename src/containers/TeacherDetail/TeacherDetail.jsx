import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { Loader, TabPanel } from "../../components";
import { useParams, useNavigate } from "react-router-dom";

import "./TeacherDetail.scss";
import { Link } from "react-router-dom";
import {
  useDeleteTeacherMutation,
  useGetTeacherQuery,
} from "../../services/teacherApi";
import { BASE_URL } from "../../constants";
import { TeacherDrawer } from "../../components/Drawers";
import { useGetCoursesQuery } from "../../services/courseApi";

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TeacherDetail = () => {
  const navigate = useNavigate();
  const [deleteTeacher] = useDeleteTeacherMutation();
  const { teacherId } = useParams();
  const { data: teacher, isLoading } = useGetTeacherQuery(teacherId);
  const { data: courses, isLoading: courseLoading } = useGetCoursesQuery();
  const [value, setValue] = React.useState(0);
  const [tabValue, setTabValue] = React.useState(0);
  const [drawer, setDrawer] = React.useState({ drawer: false });

  const toggleDrawer = (open) => (event) => {
    setDrawer({ drawer: open });
  };

  const getCourse = (id) => courses.find((c) => c._id === id);

  const onDeleteHandler = () => {
    deleteTeacher(teacher?.Teacher?._id);
    navigate("/teachers");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (isLoading || courseLoading) return <Loader />;

  return (
    <div className="container">
      <TeacherDrawer
        title={"O'qituvchini o'zgartirish"}
        currentId={teacher?.Teacher?._id}
        drawer={drawer}
        toggleDrawer={toggleDrawer}
        setDrawer={setDrawer}
      />
      <div className="teacher-detail">
        <h3>{teacher?.Teacher?.firstName}</h3>
        <div className="detail-box">
          <Box
            className="detail-tab"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Profil" key="1-tab-item" {...a11yProps(0)} />
              <Tab label="Tarix" key="2-tab-item" {...a11yProps(1)} />
              <Tab label="Ish haqi" key="3-tab-item" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="profil">
              <div className="profil-left">
                <div className="profile-box">
                  <div className="profile-img">
                    <img
                      src={`${BASE_URL}/Uploads/${teacher?.Teacher?.img}`}
                      alt="teacher-profile"
                    />
                  </div>

                  <div className="profile-body">
                    <div className="header-button">
                      <button onClick={toggleDrawer(true)}>
                        <i className="fal fa-pen" />
                      </button>
                      <button onClick={() => onDeleteHandler()}>
                        <i className="fal fa-trash" />
                      </button>
                    </div>
                    <h3>{teacher?.Teacher?.name}</h3>
                    <h4>
                      Telefon: <span>{teacher?.Teacher?.phoneNumber}</span>
                    </h4>
                    <h4>
                      Tug'ilgan kun: <span>{teacher?.Teacher?.birthday}</span>
                    </h4>
                    <h4>
                      Rollar:
                      <div className="tags">
                        <span className="tab">Teacher</span>
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
              </div>
              <div className="profil-right">
                <h3>Guruhlar</h3>
                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex",
                    height: 224,
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="standard"
                    value={tabValue}
                    onChange={tabChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: "divider" }}
                  >
                    {teacher?.TeacherGroups?.map((group, idx) => (
                      <Tab
                        label={group.name}
                        {...tabProps(0)}
                        key={idx + "group-tab"}
                      />
                    ))}
                  </Tabs>
                  {teacher?.TeacherGroups?.map((group, index) => (
                    <TabPanel
                      value={tabValue}
                      index={index}
                      key={index + "tab"}
                    >
                      <div className="group-box">
                        <div className="box-header">
                          <span>{group.name}</span>
                          <h4>{getCourse(group.course).name}</h4>
                          <h5>{group.time}</h5>
                        </div>
                        <div className="box-body">
                          <ul className="menu">
                            {teacher?.Students[index]?.map((student, idx) => (
                              <li key={idx + "item"}>
                                <Link to={`/students/profile/${student._id}`}>
                                  {student.name}
                                </Link>
                                <p>{student.number}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabPanel>
                  ))}
                </Box>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;
