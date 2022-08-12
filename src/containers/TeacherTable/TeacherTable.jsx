import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import "./TeacherTable.scss";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { TeacherDrawer } from "../../components/Drawers";
import {
  useDeleteTeacherMutation,
  useGetTeachersQuery,
} from "../../services/teacherApi";
import { Loader } from "../../components";

const TeacherTable = () => {
  const [deleteTeacher] = useDeleteTeacherMutation();
  const { data: teachersList, isLoading } = useGetTeachersQuery();
  const [drawer, setDrawer] = React.useState({ drawer: false });
  const [currentId, setCurrentId] = React.useState("");

  const toggleDrawer = (open) => (event) => {
    setDrawer({ drawer: open });
  };

  const onEditHandler = (close, id) => {
    setCurrentId(id);
    setDrawer({ drawer: true });
    close();
  };

  const onDeleteHandler = (close, id) => {
    deleteTeacher(id);
    close();
  };

  return (
    <div className="container">
      <TeacherDrawer
        title={currentId ? "O'qituvchini o'zgartirish" : "O'qituvchi yaratish"}
        currentId={currentId}
        setCurrentId={setCurrentId}
        drawer={drawer}
        setDrawer={setDrawer}
        toggleDrawer={toggleDrawer}
      />
      <div className="teacher-table">
        <header className="teacher-table-header">
          <h2>
            O'qituvchilar{" "}
            <span className="quantity-teacher">
              Miqdor — {teachersList?.length || "0"}
            </span>
          </h2>

          <button className="table-header-button" onClick={toggleDrawer(true)}>
            Yangisini qo'shish
          </button>
        </header>
        <div className="table">
          <table className="table-menu">
            {isLoading ? (
              <thead className="loader">
                <tr>
                  <th>
                    <Loader />
                  </th>
                </tr>
              </thead>
            ) : teachersList?.length ? (
              <tbody>
                {teachersList?.map((t, i) => (
                  <tr className="menu-item" key={i + "teacher-column"}>
                    <td className="num">{i + 1}.</td>
                    <td>
                      <Link to={`/teachers/profile/${t._id}`}>
                        {t?.firstName || ""} {t.lastName || ""}
                      </Link>
                    </td>
                    <td className="phone">{t?.phoneNumber}</td>
                    {/* <td>
                      <span className="count">0</span> guruh
                    </td> */}
                    <td>
                      <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                          <React.Fragment>
                            <div
                              {...bindTrigger(popupState)}
                              className="settings"
                            >
                              <i className="fal fa-ellipsis-v" />
                            </div>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem
                                onClick={() =>
                                  onEditHandler(popupState.close, t?._id)
                                }
                                className="teacher-table-item-prop"
                              >
                                <i className="fal fa-edit"></i> Tahrirlash
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  onDeleteHandler(popupState.close, t?._id)
                                }
                                className="teacher-table-item-prop"
                              >
                                <i className="fal fa-trash"></i> O'chirish
                              </MenuItem>
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <p className="empty-error">Not found</p>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherTable;
