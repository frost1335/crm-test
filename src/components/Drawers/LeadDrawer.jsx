import {
  Box,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  useCreateLeadMutation,
  useEditLeadMutation,
  useGetLeadListQuery,
} from "../../services/leadApi";

const LeadDrawer = ({
  title,
  toggleDrawer,
  drawer,
  setCurrentId,
  currentId,
  setDrawer,
}) => {
  const { data: leadList, isLoading } = useGetLeadListQuery();
  const [editLead] = useEditLeadMutation();
  const [createLead] = useCreateLeadMutation();
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [where, setWhere] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (currentId && !isLoading) {
      const currentLead = leadList.find((l) => l._id === currentId);
      setName(currentLead?.name || "");
      setTel(currentLead?.tel || "");
      setWhere(currentLead?.where || "");
      setComment(currentLead?.comment || "");
    }
  }, [isLoading, leadList, currentId]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setDrawer({ drawer: false });

    if (currentId) {
      const data = {
        _id: currentId,
        where,
        name,
        tel,
        comment,
      };
      editLead(data);
    } else {
      const data = {
        where,
        name,
        tel,
        comment,
      };
      createLead(data);
    }

    clean();
  };

  const clean = () => {
    setName("");
    setWhere("");
    setTel("");
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
                  label="Ism"
                  value={name}
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-text-form">
                <TextField
                  label="Telefon"
                  value={tel}
                  variant="outlined"
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>
              <div className="input-select-form">
                <FormControl fullWidth>
                  <InputLabel id="groupID-label">Qayerdan</InputLabel>
                  <Select
                    labelId="groupID-label"
                    value={where}
                    label="Gruppa"
                    onChange={(e) => setWhere(e.target.value)}
                  >
                    <MenuItem key={0} value="instagram">
                      Instagram
                    </MenuItem>
                    <MenuItem key={1} value="telegram">
                      Telegram
                    </MenuItem>
                    <MenuItem key={2} value="someone">
                      Kimdir
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="input-text-form">
                <TextField
                  label="Komment"
                  value={comment}
                  type="text"
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

export default LeadDrawer;
