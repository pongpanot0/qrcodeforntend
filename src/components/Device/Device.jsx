import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import DeviceTable from "./DeviceTable";
import DeviceTree from "./DeviceTree";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  color: theme.palette.text.secondary,
}));
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
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
const ariaLabel = { "aria-label": "description" };
function Device() {
  const [devSn, setDevSn] = React.useState("");
  const [name, setName] = React.useState("");
  const [create_by, setcreate_by] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [positionuuid,setpositionuuid] = React.useState('')
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const user = () => {
    const user_id = localStorage.getItem("user_id");
    setcreate_by(user_id);
  };
  const createDevice = () => {
    const items = localStorage.getItem("company_id");
   
    axios
      .post(`${process.env.REACT_APP_API_KEY}/createdevice/${items}`, {
        devSn: devSn,
        name: name,
        positionuuid: positionuuid,
        create_by: create_by,
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
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
          <h2 id="parent-modal-title">New Device</h2>
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
                  <div class="row" style={{ width: "100%" }}>
                    <div class="col-25">
                      <label for="fname">Device SN</label>
                    </div>
                    <div class="col-75">
                      <TextField
                        width="100%"
                        type="text"
                        id="fname"
                        fullWidth
                        name="firstname"
                        placeholder="Device SN"
                        onChange={(e) => {
                          setDevSn(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <br></br>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div class="row" style={{ width: "100%" }}>
                    <div class="col-25">
                      <label for="fname">Installation location</label>
                    </div>
                    <div class="col-75">
                      <TextField
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="ที่ติดตั้ง"
                        fullWidth
                        onChange={(e) => {
                          setpositionuuid(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <br></br>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div class="row" style={{ width: "100%" }}>
                    <div class="col-25">
                      <label for="fname">Device name</label>
                    </div>
                    <div class="col-75">
                      <TextField
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Device name"
                        fullWidth
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <br></br>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div class="row" style={{ width: "100%" }}>
                    <div class="col-25">
                      <label for="fname">DoorNumber</label>
                    </div>
                    <div class="col-75">
                      <TextField
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="DoorNumber"
                        fullWidth
                     
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
            <Button variant="contained">Submit</Button>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
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
              <Button variant="outlined">Reset</Button>
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
              <Button variant="contained" color="error">
                Export
              </Button>
              <Button variant="contained" color="error">
                Log
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={16} style={{ paddingTop: 10 }}>
          <Grid item md={4} xs={12}>
            <Item>
              <DeviceTree />
            </Item>
          </Grid>
          <Grid item md={12} xs={16}>
            <DeviceTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Device;
