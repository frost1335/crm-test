import { Menu, MenuItem } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React from "react";
import { Link } from "react-router-dom";
import { formatter } from "../constants";
import { artist3d } from "../images";
import { useDeleteCourseMutation } from "../services/courseApi";

const CourseCard = ({ setCurrentId, course, setDrawer }) => {
  const [deleteCourse] = useDeleteCourseMutation();

  const onEditHandler = (close) => {
    setDrawer({ drawer: true });
    setCurrentId(course._id);
    close();
  };

  const onDeleteHandler = (close) => {
    deleteCourse(course._id);
    close();
  };

  return (
    <div className="card">
      <Link to={`/courses/${course._id}`}>
        <div className="course-img">
          <img src={artist3d} alt="course-img" />
        </div>
      </Link>
      <div className="card-body">
        <h4 className="card-title">{course.name}</h4>
        <span className="card-price">
          {formatter.format(Number(course.price))}
        </span>
      </div>

      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <div {...bindTrigger(popupState)} className="edit-button">
              <i className="fal fa-ellipsis-v" />
            </div>
            <Menu {...bindMenu(popupState)}>
              <MenuItem
                onClick={() => onEditHandler(popupState.close)}
                className="teacher-table-item-prop"
              >
                <i className="fal fa-edit"></i> Tahrirlash
              </MenuItem>
              <MenuItem
                onClick={() => onDeleteHandler(popupState.close)}
                className="teacher-table-item-prop"
              >
                <i className="fal fa-trash"></i> O'chirish
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
};

export default CourseCard;
