import React from "react";
import { CourseCard, Loader } from "../../components";
import { CourseDrawer } from "../../components/Drawers";
import { useGetCoursesQuery } from "../../services/courseApi";

import "./CourseTable.scss";

const CourseTable = () => {
  const { data: courseList, isLoading } = useGetCoursesQuery();
  const [drawer, setDrawer] = React.useState({ drawer: false });
  const [currentId, setCurrentId] = React.useState("");

  const toggleDrawer = (open) => (event) => {
    setDrawer({ drawer: open });
  };

  return (
    <div className="container">
      <CourseDrawer
        title={currentId ? "Kursni o'zgartirish" : "Kurs yaratish"}
        currentId={currentId}
        setCurrentId={setCurrentId}
        drawer={drawer}
        setDrawer={setDrawer}
        toggleDrawer={toggleDrawer}
      />
      <div className="courses-table">
        <header className="courses-header">
          <h2>
            Kurslar <span>Jami — {courseList?.length || "0"}</span>
          </h2>
          <button onClick={toggleDrawer(true)}>Yangisini qo'shish</button>
        </header>
        <div className="courses-menu">
          {isLoading ? (
            <Loader />
          ) : courseList?.length ? (
            courseList?.map((c, i) => (
              <div className="menu-item" key={i}>
                <CourseCard
                  course={c}
                  setCurrentId={setCurrentId}
                  setDrawer={setDrawer}
                />
              </div>
            ))
          ) : (
            <p className="empty-error">Not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
