import React from "react";
import { TextField, Box, Drawer } from "@mui/material";

import "./Drawer.scss";
import {
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetCoursesQuery,
} from "../../services/courseApi";

const CourseDrawer = ({
  title,
  toggleDrawer,
  drawer,
  setCurrentId,
  currentId,
  setDrawer,
}) => {
  const { data: courseList, isLoading } = useGetCoursesQuery();
  const [createCourse] = useCreateCourseMutation();
  const [editCourse] = useEditCourseMutation();
  const [name, setName] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [monthDuration, setMonthDuration] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [comment, setComment] = React.useState("");

  React.useEffect(() => {
    if (currentId && !isLoading) {
      const currentCourse = courseList.find((c) => c._id === currentId);
      setName(currentCourse?.name || "");
      setDuration(currentCourse?.duration || "");
      setMonthDuration(currentCourse?.monthDuration || "");
      setPrice(currentCourse?.price || "");
      setComment(currentCourse?.comment || "");
    }
  }, [isLoading, currentId, courseList]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setDrawer({ drawer: false });

    if (currentId) {
      const data = {
        body: {
          name,
          duration,
          monthDuration,
          price,
          comment,
        },
        _id: currentId,
      };
      editCourse(data);
    } else {
      const data = {
        name,
        duration,
        monthDuration,
        price,
        comment,
      };
      createCourse(data);
    }
    clean();
  };

  const clean = () => {
    setName("");
    setDuration("");
    setMonthDuration("");
    setPrice("");
    setComment("");
    setCurrentId("");
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
                  label="Nomi"
                  value={name}
                  variant="outlined"
                  required={true}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Dars davomiyligi"
                  value={duration}
                  variant="outlined"
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Oylik davomiyligi"
                  value={monthDuration}
                  variant="outlined"
                  onChange={(e) => setMonthDuration(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Narxi"
                  value={price}
                  type="number"
                  variant="outlined"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Komment"
                  value={comment}
                  variant="outlined"
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="form-button">
                <button>Jo'natish</button>
              </div>
            </form>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default CourseDrawer;
