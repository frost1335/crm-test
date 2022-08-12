import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./LeadTable.module.scss";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import {
  useCreateLeadMutation,
  useDeleteLeadMutation,
  useGetLeadsQuery,
} from "../../services/leadApi";
import Loader from "../../components/Loader/Loader";
import { BASE_URL } from "../../constants";
import { LeadDrawer } from "../../components/Drawers";

const courses = ["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard"];
const staffs = ["Test1", "Test2", "Test3", "Test4"];

const LeadTable = () => {
  const { data: leadList, isLoading } = useGetLeadsQuery();
  const [deleteLead] = useDeleteLeadMutation();
  const [createLead] = useCreateLeadMutation();
  const [columns, setColumns] = useState([]);
  const [byCourse, setByCourse] = useState([]);
  const [createBtn, setCreateBtn] = useState("");
  const [fromWhere, setFromWhere] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [comment, setComment] = useState("");
  const [byStaff, setByStaff] = useState([]);
  const open = Boolean(createBtn);

  const [drawer, setDrawer] = useState({ drawer: false });
  const [currentId, setCurrentId] = useState("");
  const toggleDrawer = (open) => (event) => {
    setDrawer({ drawer: open });
  };

  useEffect(() => {
    if (leadList?.data) setColumns([...leadList?.data]);
  }, [leadList]);

  if (isLoading) return <Loader />;

  const handleClick = (event) => {
    setCreateBtn(event.currentTarget);
  };

  const deleteHandler = (close, id) => {
    close();
    deleteLead(id);
  };

  const editHandler = (close, id) => {
    setDrawer({ drawer: true });
    setCurrentId(id);
    close();
  };

  const handleClose = () => {
    setCreateBtn(null);
  };

  const onChangeCourse = (event) => {
    const {
      target: { value },
    } = event;
    setByCourse(typeof value === "string" ? value.split(",") : value);
  };

  const onChangeStaff = (event) => {
    const {
      target: { value },
    } = event;
    setByStaff(typeof value === "string" ? value.split(",") : value);
  };

  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(
        (column) => column.id === source.droppableId
      );
      const destColumn = columns.find(
        (column) => column.id === destination.droppableId
      );
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      let columnSource = columns.map((column) =>
        column.id === sourceColumn.id
          ? {
              ...sourceColumn,
              items: sourceItems,
            }
          : column
      );
      let columnDest = columnSource.map((column) =>
        column.id === destColumn.id
          ? {
              ...destColumn,
              items: destItems,
            }
          : column
      );

      setColumns([...columnDest]);

      await fetch(`${BASE_URL}/api/leads/update_lead`, {
        method: "PUT",
        body: JSON.stringify({
          _id: result.draggableId,
          isRequest:
            result.destination.droppableId === "column-1" ? true : false,
          isWait: result.destination.droppableId === "column-2" ? true : false,
          isGroup: result.destination.droppableId === "column-3" ? true : false,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        credentials: "include",
      });
    } else {
      const column = columns.find((col) => col.id === source.droppableId);
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      let columnCopied = columns.map((col) =>
        col.id === column.id
          ? {
              ...column,
              items: copiedItems,
            }
          : col
      );
      setColumns([...columnCopied]);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
      tel: number,
      where: fromWhere,
      comment,
    };

    handleClose();
    createLead(data);
    clean();
  };

  const clean = () => {
    setFromWhere("");
    setName("");
    setNumber("");
    setComment("");
  };

  return (
    <div className="container">
      <LeadDrawer
        title={currentId ? "Lidni o'zgartirish" : "Lid yaratish"}
        drawer={drawer}
        setDrawer={setDrawer}
        toggleDrawer={toggleDrawer}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <div className={classes.leadTable}>
        <header className={classes.header}>
          <TextField
            variant="outlined"
            label="Search"
            className={"headerInput"}
          />
          <FormControl className={"headerInput lead-header-slect"}>
            <InputLabel id="by-course">Chip</InputLabel>
            <Select
              labelId="by-course"
              id="by-course"
              multiple
              value={byCourse}
              onChange={onChangeCourse}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {courses.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={"headerInput lead-header-slect"}>
            <InputLabel id="by-staff">Chip</InputLabel>
            <Select
              labelId="by-staff"
              id="by-staff"
              multiple
              value={byStaff}
              onChange={onChangeStaff}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {staffs.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </header>

        <div className={classes.body}>
          <button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            type="button"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i className="fal fa-plus-circle" />
          </button>

          <form draggable onSubmit={onSubmitHandler}>
            <Menu
              className={"lead-menu-toggle"}
              id="basic-menu"
              anchorEl={createBtn}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <input
                className="menu-input"
                type="text"
                placeholder="Ism va Familiya"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="menu-input"
                type="text"
                placeholder="Telefon"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <FormControl className="menu-form-select">
                <InputLabel placeholder="Qayerdan" focused id="menu-label">
                  Qayerdan
                </InputLabel>
                <Select
                  value={fromWhere}
                  onChange={(e) => setFromWhere(e.target.value)}
                  label="Qayerdan"
                >
                  <MenuItem className="select-item" value={"instagram"}>
                    Instagram
                  </MenuItem>
                  <MenuItem className="select-item" value={"telegram"}>
                    Telegram
                  </MenuItem>
                  <MenuItem className="select-item" value={"someone"}>
                    Kimdirdan
                  </MenuItem>
                </Select>
              </FormControl>
              <input
                className="menu-input"
                type="text"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="button" onClick={(e) => onSubmitHandler(e)}>
                Saqlash
              </button>
            </Menu>
          </form>

          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {columns?.map((column, idx) => (
              <div className={classes.item} key={idx}>
                <h2>
                  {column.name} ({column?.items?.length})
                </h2>
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={[
                          classes.DropBox,
                          snapshot.isDraggingOver ? classes.box : "",
                        ].join(" ")}
                      >
                        {column.items.length ? (
                          column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={[
                                        classes.dropItem,
                                        snapshot.isDragging
                                          ? classes.dragging
                                          : "",
                                      ].join(" ")}
                                    >
                                      <div className={classes.itemStaff}>
                                        <span>ym</span>
                                      </div>
                                      <div className={classes.itemInfo}>
                                        <span>{item.name}</span>
                                        <p>{item.tel}</p>
                                      </div>
                                      <div className={classes.itemEnd}>
                                        <PopupState
                                          variant="popover"
                                          popupId="demo-popup-menu"
                                        >
                                          {(popupState) => (
                                            <React.Fragment>
                                              <div
                                                {...bindTrigger(popupState)}
                                                className={classes.itemSetting}
                                              >
                                                <i className="fal fa-ellipsis-h" />
                                              </div>
                                              <Menu {...bindMenu(popupState)}>
                                                <MenuItem
                                                  onClick={() =>
                                                    editHandler(
                                                      popupState.close,
                                                      item._id
                                                    )
                                                  }
                                                  className="teacher-table-item-prop"
                                                >
                                                  <i className="fal fa-edit" />
                                                  Tahrirlash
                                                </MenuItem>
                                                <MenuItem
                                                  onClick={() =>
                                                    deleteHandler(
                                                      popupState.close,
                                                      item._id
                                                    )
                                                  }
                                                  className="teacher-table-item-prop"
                                                >
                                                  <i className="fal fa-trash" />
                                                  O'chirish
                                                </MenuItem>
                                              </Menu>
                                            </React.Fragment>
                                          )}
                                        </PopupState>
                                        <div className={classes.itemDate}>
                                          {item.comment}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })
                        ) : (
                          <p className={classes.emptyText}>There is no items</p>
                        )}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;
