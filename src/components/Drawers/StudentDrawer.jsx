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
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
} from "@mui/material";

import "./Drawer.scss";
import {
  useCreateStudentMutation,
  useEditStudentMutation,
  useGetStudentsQuery,
} from "../../services/studentApi";
import { useGetGroupsQuery } from "../../services/groupApi";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const StudentDrawer = ({
  title,
  toggleDrawer,
  drawer,
  currentId,
  setCurrentId,
  setDrawer,
}) => {
  const { data: groupList, isLoading } = useGetGroupsQuery();
  const { data: studentList, isFetching } = useGetStudentsQuery();
  const [editSudent] = useEditStudentMutation();
  const [createStudent] = useCreateStudentMutation();
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [comment, setComment] = React.useState("");
  // const [group, setGroup] = React.useState("");
  const [fromDate, setFromDate] = React.useState("");
  const [groupId, setGroupId] = React.useState("");

  React.useEffect(() => {
    if (currentId && !isFetching) {
      const currentStudent = studentList.find((s) => s._id === currentId);

      setName(currentStudent?.name || "");
      setNumber(currentStudent?.number || "");
      setBirthday(currentStudent?.birthday || "");
      setGender(currentStudent?.gender || "");
      setComment(currentStudent?.comment || "");
      // setGroup(currentStudent?.group);
      setFromDate(currentStudent?.fromDate || "");
      setGroupId(currentStudent?.groupId?._id || "");
    }
  }, [currentId, studentList, setDrawer, isFetching]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setDrawer({ drawer: false });

    if (currentId) {
      const data = {
        student: {
          name,
          number,
          birthday: moment(Date(birthday)).format("MM/DD/yyyy"),
          gender,
          comment,
          // group,
          fromDate,
          groupId,
        },
        _id: currentId,
      };

      await editSudent(data);
    } else {
      const data = {
        name,
        number,
        birthday: moment(Date(birthday)).format("MM/DD/yyyy"),
        gender,
        comment,
        // group,
        fromDate,
        groupId,
      };

      createStudent(data);
    }

    clean();
  };

  const clean = () => {
    setName("");
    setNumber("");
    setBirthday("");
    setGender("");
    setComment("");
    // setGroup("");
    setFromDate("");
    setGroupId("");
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
                  label="Ism"
                  value={name}
                  required={true}
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Telefon"
                  value={number}
                  variant="outlined"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Tug'ilgan sana"
                    value={birthday}
                    onChange={(newValue) => {
                      setBirthday(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} error={false} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="input-radio-form">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Jins
                  </FormLabel>
                  <RadioGroup
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Erkak"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Ayol"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Boshqa"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="input-text-form">
                <TextField
                  label="Komment"
                  value={comment}
                  variant="outlined"
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              {/* <div className="input-text-form">
                <TextField
                  label="Gruppa"
                  value={group}
                  variant="outlined"
                  onChange={(e) => setGroup(e.target.value)}
                />
              </div> */}
              <div className="input-text-form">
                <TextField
                  label="Boshlagan sana"
                  value={fromDate}
                  variant="outlined"
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="input-select-form">
                <FormControl fullWidth>
                  <InputLabel id="groupID-label">Gruppa</InputLabel>
                  <Select
                    labelId="groupID-label"
                    value={groupId}
                    label="Gruppa"
                    required={true}
                    onChange={(e) => setGroupId(e.target.value)}
                  >
                    {isLoading ? null : groupList?.Groups.length ? (
                      groupList?.Groups.map((g, i) => (
                        <MenuItem key={i} value={g._id}>
                          {g.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={""}>No groups</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
              <div className="form-button">
                <button type="submit">Jo'natish</button>
              </div>
            </form>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default StudentDrawer;
