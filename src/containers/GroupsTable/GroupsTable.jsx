import {
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  Box,
} from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GroupDrawer } from "../../components/Drawers";
import Loader from "../../components/Loader/Loader";
import { useAdminStatus } from "../../hooks/admin.hook";
import { useGetCoursesQuery } from "../../services/courseApi";
import {
  useDeleteGroupMutation,
  useGetGroupsQuery,
} from "../../services/groupApi";
import { useGetTeachersQuery } from "../../services/teacherApi";

import "./GroupsTable.scss";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const GroupsTable = () => {
  const location = useLocation();
  const {
    data: groupsData,
    isLoading: isLoad,
    refetch,
  } = useGetGroupsQuery(location?.state?.status || 'admin');
  const [groupsList, setGroupsList] = useState(() => []);
  const { data: courseList, isLoading: loadingCourse } = useGetCoursesQuery();
  const { data: teacherList, isLoading: loadingTeacher } =
    useGetTeachersQuery();
  const [deleteGroup] = useDeleteGroupMutation();
  const [activeGroup, setActiveGroup] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [course, setCourse] = useState([]);
  const [days, setDays] = useState([]);
  const [drawer, setDrawer] = React.useState({ drawer: false });
  const [currentId, setCurrentId] = React.useState("");
  const admin = useAdminStatus();

  useEffect(() => {
    if (!isLoad) {
      setGroupsList({ ...groupsData });
    }

    refetch();

    return () => {
      setGroupsList([]);
    };
  }, [refetch, groupsData, isLoad]);

  const toggleDrawer = (open) => (event) => {
    setDrawer({ drawer: open });
  };

  const getCourseId = (id) => {
    return courseList?.find((c) => c._id === id);
  };
  const getTeacherId = (id) => {
    return teacherList?.find((t) => t._id === id);
  };

  const courseChange = (event) => {
    const {
      target: { value },
    } = event;
    setCourse(typeof value === "string" ? value.split(",") : value);
  };

  const activeGroupChange = (event) => {
    const {
      target: { value },
    } = event;
    setActiveGroup(typeof value === "string" ? value.split(",") : value);
  };

  const teacherChange = (event) => {
    const {
      target: { value },
    } = event;
    setTeacher(typeof value === "string" ? value.split(",") : value);
  };

  const dayChange = (event) => {
    const {
      target: { value },
    } = event;
    setDays(typeof value === "string" ? value.split(",") : value);
  };

  const onEditHandler = (close, id) => {
    close();
    setCurrentId(id);
    setDrawer({ drawer: true });
  };

  const onDeleteHandler = (close, id) => {
    close();
    deleteGroup(id);
  };

  return (
    <div className="container">
      <GroupDrawer
        title={currentId ? "Gruppani o'zgartirish" : "Gruppa yaratish"}
        currentId={currentId}
        setCurrentId={setCurrentId}
        drawer={drawer}
        setDrawer={setDrawer}
        toggleDrawer={toggleDrawer}
      />
      <div className="groups-table">
        <header className="groups-header">
          <h2>
            Guruhlar <span>Miqdori — {groupsList?.Groups?.length || "0"}</span>
          </h2>
          {admin?.status === "admin" ? (
            <button onClick={toggleDrawer(true)}>Yangisini qo'shish</button>
          ) : null}
        </header>
        <div className="groups-filter-box">
          <FormControl className="select-input">
            <InputLabel id="active-label">Faol gutuhlar</InputLabel>
            <Select
              labelId="active-label"
              id="active-select"
              multiple
              value={activeGroup}
              onChange={activeGroupChange}
              input={<OutlinedInput id="active-input" label="Faol gutuhlar" />}
              renderValue={(selected) => (
                <Box>
                  {selected?.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="select-input">
            <InputLabel id="teacher-label">O'qituvchi</InputLabel>
            <Select
              labelId="teacher-label"
              id="teacher-select"
              multiple
              value={teacher}
              onChange={teacherChange}
              input={<OutlinedInput id="teacher-input" label="O'qituvchi" />}
              renderValue={(selected) => (
                <Box>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="select-input">
            <InputLabel id="course-label">kurslar</InputLabel>
            <Select
              labelId="course-label"
              id="course-select"
              multiple
              value={course}
              onChange={courseChange}
              input={<OutlinedInput id="course-input" label="Kurslar" />}
              renderValue={(selected) => (
                <Box>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="select-input">
            <InputLabel id="days-label">Kunlar</InputLabel>
            <Select
              labelId="days-label"
              id="days-select"
              multiple
              value={days}
              onChange={dayChange}
              input={<OutlinedInput id="days-input" label="Kunlar" />}
              renderValue={(selected) => (
                <Box>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="groups-body">
          <table>
            <thead>
              <tr>
                <th className="num">№</th>
                <th className="group">Guruh</th>
                <th className="course">Kurslar</th>
                <th className="teacher">O'qituvchi</th>
                <th className="day">Kunlar</th>
                <th className="date">Mashg'ulot davomiyligi</th>
                <th className="esctime">Oylik darslar</th>
                <th className="room">Xonalar</th>
                {admin?.status === "admin" ? (
                  <th className="extra">Amallar</th>
                ) : null}
              </tr>
            </thead>
            {isLoad || loadingCourse || loadingTeacher ? (
              <thead className="loader">
                <tr>
                  <th>
                    <Loader />
                  </th>
                </tr>
              </thead>
            ) : groupsList?.Groups?.length ? (
              <tbody>
                {groupsList?.Groups?.map((g, i) => (
                  <tr key={i}>
                    <td className="num">{i + 1}.</td>
                    <td className="group">
                      <Link to={`/groups/view/${g?._id}`}>{g.name}</Link>
                    </td>
                    <td className="course">{getCourseId(g?.course)?.name}</td>
                    <td className="teacher">
                      {getTeacherId(g?.teacher)?.firstName}
                    </td>
                    <td className="day">{g?.time}</td>
                    <td className="date">{g?.date}</td>
                    <td className="esctime">{g?.days} ta</td>
                    <td className="room">{g?.room}</td>
                    {admin?.status === "admin" ? (
                      <td className="extra">
                        <PopupState variant="popover" popupId="demo-popup-menu">
                          {(popupState) => (
                            <React.Fragment>
                              <button {...bindTrigger(popupState)}>
                                <i className="fal fa-ellipsis-v" />
                              </button>
                              <Menu {...bindMenu(popupState)}>
                                <MenuItem
                                  onClick={() =>
                                    onEditHandler(popupState.close, g?._id)
                                  }
                                  className="teacher-table-item-prop"
                                >
                                  <i className="fal fa-edit"></i> Tahrirlash
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    onDeleteHandler(popupState.close, g?._id)
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
                    ) : null}
                  </tr>
                ))}
              </tbody>
            ) : (
              <tfoot>
                <tr>
                  <th>
                    <p className="exmpty-error">Not found</p>
                  </th>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default GroupsTable;
