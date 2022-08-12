import React from "react";
import moment from "moment";
import {
  FormControl,
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
  useCreateTeacherMutation,
  useEditTeacherMutation,
  useGetTeachersQuery,
} from "../../services/teacherApi";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const TeacherDrawer = ({
  title,
  toggleDrawer,
  drawer,
  currentId,
  setCurrentId,
  setDrawer,
}) => {
  const [createTeacher] = useCreateTeacherMutation();
  const [editTeacher] = useEditTeacherMutation();
  const { data, isLoading } = useGetTeachersQuery();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [img, setImg] = React.useState("teacher img");

  React.useEffect(() => {
    if (currentId && !isLoading) {
      const currentTeacher = data.find((t) => t._id === currentId);
      setFirstName(currentTeacher?.firstName || "");
      setLastName(currentTeacher?.lastName || "");
      setNumber(currentTeacher?.phoneNumber || "");
      setBirthday(currentTeacher?.birthday || "");
      setGender(currentTeacher?.gender || "");
      setPassword(currentTeacher?.password || "");
      setImg(currentTeacher?.img || "");
    }
  }, [currentId, data, isLoading]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setDrawer(false);

    if (currentId) {
      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", number);
      formData.append("birthday", moment(Date(birthday)).format("MM/DD/yyyy"));
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("img", img);
      formData.append("_id", currentId);

      await editTeacher(formData);
    } else {
      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", number);
      formData.append("birthday", moment(Date(birthday)).format("MM/DD/yyyy"));
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("img", img);

      await createTeacher(formData);
    }

    clear();
  };

  const clear = () => {
    setFirstName("");
    setLastName("");
    setNumber("");
    setBirthday("");
    setGender("");
    setPassword("");
    setImg("");
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
                  variant="outlined"
                  value={firstName}
                  required={true}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Familiya"
                  variant="outlined"
                  value={lastName}
                  required={true}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Telefon"
                  variant="outlined"
                  value={number}
                  required={true}
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
                    row
                    value={gender}
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

              <div className="input-text-form input-file">
                <TextField
                  label="Rasm"
                  variant="outlined"
                  value={img.filename}
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>

              <div className="input-text-form">
                <TextField
                  label="Parol"
                  variant="outlined"
                  value={password}
                  type="password"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
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

export default TeacherDrawer;
