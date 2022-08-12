import * as React from "react";
import {
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Box,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Link } from "react-router-dom";

import "./StudentsTable.scss";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { StudentDrawer } from "../../components/Drawers";
import {
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from "../../services/studentApi";
import Loader from "../../components/Loader/Loader";
// import { formatter } from "../../constants";
import { useGetTeachersQuery } from "../../services/teacherApi";

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

const StudentsTable = () => {
  const { data: studentList, isLoading } = useGetStudentsQuery();
  const { data: teacherList, isFetching } = useGetTeachersQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [search, setSearch] = React.useState("");
  const [course, setCourse] = React.useState([]);
  const [requestStatus, setRequestStatus] = React.useState([]);
  const [financeStatus, setFinanceStatus] = React.useState([]);
  const [drawer, setDrawer] = React.useState({ drawer: false });
  const [currentId, setCurrentId] = React.useState("");

  const toggleDrawer = (open) => (event) => {
    setDrawer({ drawer: open });
  };

  const getTeacherId = (id) => {
    return teacherList.find((t) => t._id === id);
  };

  const onEditHandler = (close, id) => {
    setDrawer({ drawer: true });
    setCurrentId(id);
    close();
  };
  const onDeleteHandler = (close, id) => {
    deleteStudent(id);
    close();
  };

  const courseChange = (event) => {
    const {
      target: { value },
    } = event;
    setCourse(typeof value === "string" ? value.split(",") : value);
  };

  const requestStatusChange = (event) => {
    const {
      target: { value },
    } = event;
    setRequestStatus(typeof value === "string" ? value.split(",") : value);
  };

  const financeStatusChange = (event) => {
    const {
      target: { value },
    } = event;
    setFinanceStatus(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="container">
      <StudentDrawer
        title={currentId ? "Talabani o'zgartirish" : "Talaba yaratish"}
        drawer={drawer}
        currentId={currentId}
        setCurrentId={setCurrentId}
        setDrawer={setDrawer}
        toggleDrawer={toggleDrawer}
      />
      <div className="students-table">
        <header className="student-header">
          <h2>
            Talabalar <span>Miqdori — {studentList?.length || "0"}</span>
          </h2>
          <button onClick={toggleDrawer(true)}>Yangisini qo'shish</button>
        </header>
        <div className="student-filter-box">
          <TextField
            className="text-input"
            label="Ism yoki telefon raqam"
            value={search}
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
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
            <InputLabel id="student-label">Talaba holati</InputLabel>
            <Select
              labelId="student-label"
              id="student-select"
              multiple
              value={requestStatus}
              onChange={requestStatusChange}
              input={<OutlinedInput id="student-input" label="Talaba holati" />}
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
            <InputLabel id="finance-label">Moliyaviy holati</InputLabel>
            <Select
              labelId="finance-label"
              id="finance-select"
              multiple
              value={financeStatus}
              onChange={financeStatusChange}
              input={
                <OutlinedInput id="finance-input" label="Moliyaviy holati" />
              }
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
        <div className="student-table">
          <table>
            <thead>
              <tr>
                <th className="num">№</th>
                <th className="name">Ism</th>
                <th className="phone">Telefon</th>
                <th className="group">Guruhlar</th>
                <th className="teacher">O'qituvchilar</th>
                {/* <th className="activities">Mashg'ulotlar sanalari</th> */}
                {/* <th className="balance">Balans</th> */}
                <th className="extra"></th>
              </tr>
            </thead>
            {isLoading || isFetching ? (
              <thead className="loader">
                <tr>
                  <th>
                    <Loader />
                  </th>
                </tr>
              </thead>
            ) : studentList?.length ? (
              <tbody>
                {studentList?.map((s, i) => (
                  <tr key={i}>
                    <td className="num">{i + 1}.</td>
                    <td className="name">
                      <Link to={`/students/profile/${s?._id}`}>{s?.name}</Link>
                      <div className="date">{s?.fromDate}</div>
                    </td>
                    <td className="phone">
                      <span>{s?.number}</span>
                    </td>
                    <td className="group">
                      <p>
                        {s?.groupId ? (
                          <span className="group-number">
                            {s?.groupId?.name}
                          </span>
                        ) : null}
                      </p>
                    </td>
                    <td className="teacher">
                      <span>
                        {getTeacherId(s?.groupId?.teacher)?.firstName}
                      </span>
                    </td>
                    {/* <td className="activities">
        <span>03.06.2022 — 03.10.2022</span>
      </td> */}
                    {/* <td className="balance">
                      <span>
                        {s.balans
                          ? formatter.format(Number(s.balans))
                          : formatter.format(Number(0))}
                      </span>
                    </td> */}
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
                                  onEditHandler(popupState.close, s?._id)
                                }
                                className="teacher-table-item-prop"
                              >
                                <i className="fal fa-edit"></i> Tahrirlash
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  onDeleteHandler(popupState.close, s?._id)
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
              <p className="epmty-error">Not found</p>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;
