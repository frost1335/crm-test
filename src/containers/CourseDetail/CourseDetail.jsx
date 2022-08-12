import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { Loader, TabPanel } from "../../components";
import { artist3d } from "../../images";
import { useParams, useNavigate } from "react-router-dom";

import "./CourseDetail.scss";
import {
  useDeleteCourseMutation,
  useGetCourseQuery,
} from "../../services/courseApi";
import { formatter } from "../../constants";
import { CourseDrawer } from "../../components/Drawers";
import { useGetAdminQuery } from "../../services/adminApi";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CourseDetail = () => {
  const navigate = useNavigate();
  const [deleteCourse] = useDeleteCourseMutation();
  const { courseId } = useParams();
  const { data: admin, isLoading: adminLoading } = useGetAdminQuery();
  const { data: course, isLoading } = useGetCourseQuery(courseId);
  const [value, setValue] = React.useState(0);
  const [drawer, setDrawer] = React.useState({ drawer: false });

  const toggleDrawer = (open) => (event) => {
    setDrawer({ drawer: open });
  };

  const onDeleteHandler = () => {
    deleteCourse(course?._id);
    navigate("/courses");
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading || adminLoading) return <Loader />;

  return (
    <div className="container">
      <CourseDrawer
        title={"Kursni o'zgartirish"}
        drawer={drawer}
        setDrawer={setDrawer}
        toggleDrawer={toggleDrawer}
        currentId={course?._id}
      />
      <div className="detail-header">
        <h2 className="detail-course-name">{course?.name}</h2>
      </div>
      <div className="course-detail">
        <div className="detail-left">
          <div className="left-img">
            {admin.status === "admin" ? (
              <div className="header-buttons">
                <button className="edit" onClick={toggleDrawer(true)}>
                  <i className="fal fa-pen" />
                </button>
                <button className="delete" onClick={() => onDeleteHandler()}>
                  <i className="fal fa-trash" />
                </button>
              </div>
            ) : null}
            <img src={artist3d} alt="course-detail-img" />
          </div>
          <div className="left-body">
            <h4>Izoh</h4>
            <span>{course?.comment}</span>
            <h4>Narx</h4>
            <span>{formatter?.format(course?.price)}</span>
            {/* <h4>Talabalar</h4>
            <span>0</span> */}
            <h4>Dars davomiyligi</h4>
            <span>{course?.duration}</span>
            <h4>Dars oylari soni</h4>
            <span>{course?.monthDuration}</span>
          </div>
        </div>
        <div className="detail-right">
          <Box
            className="detail-tab"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Onlayn Darslar va materiallar" {...a11yProps(0)} />
              <Tab label="Darajalar" {...a11yProps(1)} />
              <Tab label="Guruhlar" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}></TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
