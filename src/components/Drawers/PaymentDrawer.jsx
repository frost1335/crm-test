import React, { useState } from "react";
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
import { useCreatePaymentMutation } from "../../services/studentApi";
import { useGetStudentsQuery } from "../../services/studentApi";

const PaymentDrawer = (
  {
    title,
    togglePayment,
    paymentDrawer,
    studentId,
    studentName,
    setPaymentDrawer,
  },
  props
) => {
  const { refetch } = useGetStudentsQuery();
  const [createPayment] = useCreatePaymentMutation();
  const [payMethod, setPayMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setPaymentDrawer(false);

    const data = {
      StudentId: studentId,
      PayMethod: payMethod,
      amount: Number(amount),
      date: moment(Date(date)).format("MM/DD/yyyy"),
      comment,
    };
    createPayment(data);
    refetch();

    clean();
  };

  const clean = () => {
    setPayMethod("");
    setAmount("");
    setDate("");
    setComment("");
  };

  return (
    <div className="drawer">
      <Drawer
        anchor={"right"}
        open={paymentDrawer}
        onClose={togglePayment(false)}
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
              <button onClick={togglePayment(false)}>
                <i className="fal fa-times" />
              </button>
            </div>
            <form className="drawer-form" onSubmit={onSubmitHandler}>
              <div className="input-select-form">
                <FormControl fullWidth>
                  <InputLabel id="groupID-label">To'lov usuli</InputLabel>
                  <Select
                    labelId="payMethod-label"
                    value={payMethod}
                    label="To'lov usuli"
                    onChange={(e) => setPayMethod(e.target.value)}
                  >
                    <MenuItem key="1-method" value={"naqd"}>
                      Naqd pul
                    </MenuItem>
                    <MenuItem key="2-method" value={"terminal"}>
                      Karta orqali
                    </MenuItem>
                    <MenuItem key="3-method" value={"bank"}>
                      Bank orqali
                    </MenuItem>
                    <MenuItem key="4-method" value={"click"}>
                      Click orqali
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="input-text-form">
                <TextField
                  label="Miqdori"
                  type={"number"}
                  value={amount}
                  variant="outlined"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <LocalizationProvider
                  error={false}
                  dateAdapter={AdapterDateFns}
                >
                  <DatePicker
                    error={false}
                    label="Sanasi"
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
              <div className="input-text-form">
                <TextField
                  label="Komment"
                  value={comment}
                  variant="outlined"
                  onChange={(e) => setComment(e.target.value)}
                />
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

export default PaymentDrawer;
