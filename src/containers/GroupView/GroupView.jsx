import { Menu, MenuItem } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { GroupDrawer } from "../../components/Drawers";
import Loader from "../../components/Loader/Loader";
import { formatter } from "../../constants";
import { useAdminStatus } from "../../hooks/admin.hook";
import {
  useEditAttendanceMutation,
  useGetAttandanceQuery,
} from "../../services/attandaneApi";
import {
  useDeleteGroupMutation,
  useGetGroupQuery,
} from "../../services/groupApi";

import "./GroupView.scss";

const GroupView = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const admin = useAdminStatus();
  const { data: group, isLoading } = useGetGroupQuery(groupId);
  const { data: attandanceList, isLoading: attandanceLoading } =
    useGetAttandanceQuery(groupId);
  const [deleteGroup] = useDeleteGroupMutation();
  const [editAttandance] = useEditAttendanceMutation();
  const [attandanceTable, setAttandanceTable] = useState({});
  const [currentMonth, setCurrentMonth] = useState(0);
  const [drawer, setDrawer] = React.useState({ drawer: false });

  const toggleDrawer = (open) => (event) => {
    setDrawer({ drawer: open });
  };

  const onDeleteHandler = () => {
    deleteGroup(group?.Group?._id);
    navigate("/groups");
  };

  useEffect(() => {
    if (attandanceList) {
      setCurrentMonth(
        Number(
          location?.search?.replace(/[^0-9]/g, "") ||
            attandanceList[0]?.currentMonth - 1
        )
      );
      setAttandanceTable(attandanceList[0]);
    }
  }, [attandanceList, location]);

  if (isLoading || attandanceLoading || !admin) return <Loader />;
  const onEditAttandance = (close, obj) => {
    let cloneAttandanceMonth = [...attandanceTable?.month];

    setAttandanceTable({ month: [...cloneAttandanceMonth] });

    close();
    editAttandance(obj);
    navigate(`?currentMonth=${obj.month - 1}`);
  };

  const onEditCurrentMonth = (num) => {
    setCurrentMonth(num);
    navigate(`?currentMonth=${num}`);
  };

  const onDeleteAttandance = (obj) => editAttandance(obj);

  return (
    <div className="container">
      <GroupDrawer
        title={"Gruppani o'zgartirish"}
        drawer={drawer}
        setDrawer={setDrawer}
        toggleDrawer={toggleDrawer}
        currentId={group?.Group?._id}
      />
      <h2>{group?.Group?.name}</h2>
      <div className="group-view">
        <div className="group-left">
          <div className="group-card">
            <header className="card-header">
              <span className="group">{group?.Group?.name}</span>
              <div className="course-title">
                <Link
                  to={`/courses/${group?.Group?.course?._id}`}
                  className="course"
                >
                  {group?.Group?.course?.name}
                </Link>
                ・
                <Link
                  to={`/teachers/profile/${group?.Group?.teacher?._id}`}
                  className="teacher"
                >
                  {`${group?.Group?.teacher?.firstName} ${group?.Group?.teacher?.lastName}`}
                </Link>
              </div>
              <span className="price">
                Narx: {formatter.format(group?.Group?.course?.price)}
              </span>
              <span className="time">Vaqt: {group?.Group?.time}</span>
              <span className="room">Xonalar: {group?.Group?.room}</span>
              <span className="date">
                Mshg'ulot sanalari: <p>{" " + group?.Group.date}</p>
              </span>
              {admin?.status === "admin" ? (
                <div className="header-buttons">
                  <button className="edit" onClick={toggleDrawer(true)}>
                    <i className="fal fa-pen" />
                  </button>
                  <button className="delete" onClick={() => onDeleteHandler()}>
                    <i className="fal fa-trash" />
                  </button>
                </div>
              ) : null}
            </header>
            <div className="card-body">
              <h3>Students — {group?.Students?.length || "0"}</h3>
              <ul className="card-menu">
                {group?.Students?.length ? (
                  group?.Students?.map((s, i) => (
                    <li className="item" key={i}>
                      <Link to={`/students/profile/${s?._id}`}>
                        <span className="status" />
                        {s?.name}
                      </Link>
                      <p className="phone">{s?.number}</p>
                    </li>
                  ))
                ) : (
                  <p className="empty-error">Not found</p>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="group-right">
          <div className="attendance">
            <header className="attandance-box-header">
              <h3>Davomat</h3>
              <div className="month-box">
                {attandanceList?.length ? (
                  attandanceList[0]?.month[0]?.month?.map((m, i) =>
                    i === currentMonth ? (
                      <button
                        className="month-button active"
                        key={i}
                        onClick={() => onEditCurrentMonth(i)}
                      >
                        {i + 1}-oy
                      </button>
                    ) : (
                      <button
                        className="month-button"
                        key={i}
                        onClick={() => onEditCurrentMonth(i)}
                      >
                        {i + 1}-oy
                      </button>
                    )
                  )
                ) : (
                  <p className="empty-error">Months not found</p>
                )}
              </div>
            </header>
            <div className="attandt-body">
              {attandanceList?.length ? (
                <table>
                  <thead>
                    <tr>
                      <th className="name">Ism</th>
                      {attandanceList[0]?.month[0]?.month[0]?.days?.map(
                        (e, i) => (
                          <th key={i} className="lesson">
                            {i + 1}-dars
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {attandanceList[0]?.month?.map((a, i) => (
                      <tr key={i}>
                        <td className="name">{a?.student?.name}</td>
                        {a?.month[currentMonth]?.days?.map((l, idx) => (
                          <td className="lesson" key={idx}>
                            <PopupState
                              variant="popover"
                              popupId="demo-popup-menu"
                            >
                              {(popupState) => (
                                <React.Fragment>
                                  <div className="attendance-btn">
                                    {l === null ? (
                                      <button
                                        disabled={
                                          Number(
                                            location?.search.replace(
                                              /[^0-9]/g,
                                              ""
                                            )
                                          ) >
                                          attandanceList[0]?.currentMonth - 1
                                        }
                                        {...bindTrigger(popupState)}
                                      />
                                    ) : l ? (
                                      <div className="yes">
                                        Bor edi{" "}
                                        <span
                                          className="x"
                                          onClick={() =>
                                            onDeleteAttandance({
                                              _id: groupId,
                                              id: a?.student?._id,
                                              month: currentMonth + 1,
                                              day: idx + 1,
                                              status: null,
                                            })
                                          }
                                        >
                                          <i className="fal fa-times"></i>
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="no">
                                        Yo'q{" "}
                                        <span
                                          className="x"
                                          onClick={() =>
                                            onDeleteAttandance({
                                              _id: groupId,
                                              id: a?.student?._id,
                                              month: currentMonth + 1,
                                              day: idx + 1,
                                              status: null,
                                            })
                                          }
                                        >
                                          <i className="fal fa-times"></i>
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <Menu {...bindMenu(popupState)}>
                                    <MenuItem
                                      onClick={() =>
                                        onEditAttandance(popupState.close, {
                                          _id: groupId,
                                          id: a?.student?._id,
                                          month: currentMonth + 1,
                                          day: idx + 1,
                                          status: true,
                                        })
                                      }
                                      className="teacher-table-item-prop"
                                    >
                                      <i className="fal fa-edit" /> Bor edi
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        onEditAttandance(popupState.close, {
                                          _id: groupId,
                                          id: a?.student?._id,
                                          month: currentMonth + 1,
                                          day: idx + 1,
                                          status: false,
                                        })
                                      }
                                      className="teacher-table-item-prop"
                                    >
                                      <i className="fal fa-trash" /> Yo'q
                                    </MenuItem>
                                  </Menu>
                                </React.Fragment>
                              )}
                            </PopupState>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <tfoot>
                  <tr>
                    <td>
                      <p className="empty-error">Not found</p>
                    </td>
                  </tr>
                </tfoot>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupView;
