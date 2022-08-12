import React from "react";
import moment from "moment";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Drawer,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "./Drawer.scss";
import {
  useCreateGroupMutation,
  useEditGroupMutation,
  useGetGroupsQuery,
} from "../../services/groupApi";
import { useGetCoursesQuery } from "../../services/courseApi";
import { useGetTeachersQuery } from "../../services/teacherApi";

const GroupDrawer = ({
  title,
  toggleDrawer,
  drawer,
  setDrawer,
  currentId,
  setCurrentId,
}) => {
  const { data: groupsList, isFetching } = useGetGroupsQuery();
  const { data: courseList, isLoading } = useGetCoursesQuery();
  const { data: teacherList, isLoading: isLoad } = useGetTeachersQuery();
  const [createGroup] = useCreateGroupMutation();
  const [editGroup] = useEditGroupMutation();
  const [name, setName] = React.useState("");
  const [courseId, setCourseId] = React.useState("");
  const [teacher, setTeacher] = React.useState("");
  const [days, setDays] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [time, setTime] = React.useState("");
  const [date, setDate] = React.useState("");

  React.useEffect(() => {
    if (currentId && !isFetching) {
      const currentGroup = groupsList?.Groups.find((g) => g._id === currentId);

      setName(currentGroup?.name || "");
      setCourseId(currentGroup?.course || "");
      setTeacher(currentGroup?.teacher || "");
      setDays(currentGroup?.days || "");
      setRoom(currentGroup?.room || "");
      setTime(currentGroup?.time || "");
      setDate(currentGroup?.date || "");  
    }
  }, [currentId, groupsList, isFetching]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setDrawer({ drawer: false });

    if (currentId) {
      const data = {
        group: {
          name,
          course: courseId,
          teacher,
          days,
          room,
          time,
          date: moment(Date(date)).format("MM/DD/yyyy"),
          _id: currentId,
        },
        _id: currentId,
      };

      await editGroup(data);
    } else {
      const data = {
        name,
        course: courseId,
        teacher,
        days,
        room,
        time,
        date: moment(Date(date)).format("MM/DD/yyyy"),
      };

      createGroup(data);
    }

    clean();
  };

  const clean = () => {
    setName("");
    setCourseId("");
    setTeacher("");
    setDays("");
    setRoom("");
    setTime("");
    setDate("");
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
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="input-select-form">
                <FormControl fullWidth>
                  <InputLabel id="courseId-label">Kurs</InputLabel>
                  <Select
                    labelId="courseId-label"
                    value={courseId}
                    label="Kurs"
                    required={true}
                    onChange={(e) => setCourseId(e.target.value)}
                  >
                    {isLoading
                      ? null
                      : courseList.map((c, i) => (
                          <MenuItem value={c._id} key={i}>
                            {c.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </div>
              <div className="input-select-form">
                <FormControl fullWidth>
                  <InputLabel id="courseId-label">O'qituvchi</InputLabel>
                  <Select
                    labelId="courseId-label"
                    value={teacher}
                    label="O'qituvchi"
                    required={true}
                    onChange={(e) => setTeacher(e.target.value)}
                  >
                    {isLoad
                      ? null
                      : teacherList.map((c, i) => (
                          <MenuItem value={c._id} key={i}>
                            {c.firstName}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </div>
              <div className="input-text-form">
                <TextField
                  label="Bir oylik darsalr soni"
                  type={"number"}
                  value={days}
                  variant="outlined"
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Xonalar"
                  value={room}
                  variant="outlined"
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Vaqti"
                  value={time}
                  variant="outlined"
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Mashg'ulot davomiyligi"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                  />
                </LocalizationProvider>
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

export default GroupDrawer;
