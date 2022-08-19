import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import FormControl from "@mui/material/FormControl";

import TextField from "@mui/material/TextField";
import RoomTable from "./RoomTable";

import RoomTree from "./RoomTree";
import axios from "axios";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  color: theme.palette.text.secondary,
}));
const ariaLabel = { "aria-label": "description" };
function Floor() {
  const [err, setError] = React.useState(false);

  const [room_buildingUuid, setroom_buildingUuid] = React.useState("");
  const [room_name, setroom_name] = React.useState("");
  const [building, setBuilding] = React.useState([]);
  const [code, setCode] = React.useState("");
  React.useEffect(() => {
    setError(true);
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getbuild/${items}`)
      .then((res) => {
        setBuilding(res.data.data.data.list);
        setError(false);
      });
  }, []);
  const dateElement = building.map((row, i) => {
    console.log(row);
    return <MenuItem value={row.id}>{row.name}</MenuItem>;
  });
  const createbuild = (e) => {
    e.preventDefault();
    setError(true);
    const user_id = localStorage.getItem("user_id");
    const items = localStorage.getItem("company_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/createRoom/${items}`, {
        room_buildingUuid: room_buildingUuid,
        room_name: room_name,
        created_by: user_id,
        code: code,
      })

      .then((res) => {
        if (res.data.code === 0) {
          setError(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setroom_buildingUuid(event.target.value);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          <h2 id="parent-modal-title">New Room</h2>
          <br></br>
          <hr></hr>
          <br></br>

          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            >
              <Grid item xs={12}>
                {" "}
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-25">
                      <label for="fname">ตึก</label>
                    </div>
                    <div className="col-50">
                      <FormControl fullWidth style={{ width: "100%" }}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={room_buildingUuid}
                          label="Age"
                          onChange={handleChange}
                          fullWidth
                        >
                          {dateElement}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <br></br>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-25">
                      <label for="fname">RoomName</label>
                    </div>
                    <div className="col-75">
                      <TextField
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Your name.."
                        fullWidth
                        onChange={(e) => {
                          setroom_name(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <br></br>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-30">
                      <label for="fname">RoomNum</label>
                    </div>
                    <div className="col-50">
                      <TextField
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="ใส่ได้เฉพาะตัวเลข"
                        fullWidth
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <br></br>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <hr></hr>
          <br />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={createbuild}>
              Submit
            </Button>
            <Button variant="outlined">Reset</Button>
          </Stack>
        </Box>
      </Modal>
      <Box sx={{ flexGrow: 1 }} style={{ height: "100%" }}>
        <Grid container spacing={2} columns={16}>
          <Grid item md={4} xs={12}>
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1 } }}
              noValidate
              autoComplete="off"
            >
              <Input
                placeholder="Placeholder"
                inputProps={ariaLabel}
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </Box>
          </Grid>
          <Grid item md={3} xs={12}>
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1 } }}
              noValidate
              autoComplete="off"
            ></Box>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Submit</Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Stack>
          </Grid>
          <Grid item md={8} xs={12}></Grid>
          <Grid item md={2} xs={12}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleOpen}>
                Add
              </Button>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={16} style={{ paddingTop: 10 }}>
          <Grid item md={4} xs={12}>
            <Item>
              <RoomTree />
            </Item>
          </Grid>
          <Grid item md={12} xs={16}>
            <RoomTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Floor;
