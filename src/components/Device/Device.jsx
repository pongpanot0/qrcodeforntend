import React from "react";

import Input from "@mui/material/Input";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import DeviceTable from "./DeviceTable";
import DeviceTree from "./DeviceTree";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
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

const ariaLabel = { "aria-label": "description" };
function Device() {
  const [devSn, setDevSn] = React.useState("");
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [positionuuid, setpositionuuid] = React.useState("");
  const [accDoorNo, setaccDoorNo] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [building, setBuilding] = React.useState([]);
  const [fail, setfail] = React.useState(false);
  const [fail2, setfail2] = React.useState(false);
  const [room2, setRoom2] = React.useState([]);
  const deletemanypeople = (e) => {
    const items = localStorage.getItem("company_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/removemanyDevice/${items}`, {
        id: room2,
      })
      .then((res) => {
        window.location.reload(true);
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Selec = (event) => {
    setRoom2(event);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleRefresh =() =>{
    window.location.reload(false);
  }
  const handleClose = () => {
    setOpen(false);

  };
  const data = building.map((row) => {
    return <MenuItem value={row.id}>{row.name}</MenuItem>;
  });

  React.useEffect(() => {
    setErr(true);
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getbuild/${items}`)
      .then((res) => {
        setBuilding(res.data.data.data.list);
        setErr(false);
      });
  }, []);

  const createDevice = (e) => {
    e.preventDefault();
    setErr(true);
    const user_id = localStorage.getItem("user_id");
    const items = localStorage.getItem("company_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/createdevice/${items}`, {
        devSn: devSn,
        name: name,
        positionuuids: positionuuid,
        create_by: user_id,
        accDoorNo: accDoorNo,
      })
      .then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          handleClose();
          setErr(false);
          window.location.reload(false);
        }
        if (res.data.status === 400) {
          setErr(false);
          setfail(true);
     
          
          console.log("?????? Device ????????????????????????");
        }
        if (res.data.status === 401) {
          setErr(false);
          setfail2(true);
          
          console.log("?????? Device ????????????????????????");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setpositionuuid(event.target.value);
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
          <h2 id="parent-modal-title">???????????????</h2>
          <br></br>
          <hr></hr>
          <br></br>

          <Box sx={{ width: "100%" }}>
            {err ? (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
              >
                <CircularProgress color="inherit" className="centered" />
              </Backdrop>
            ) : (
              <> </>
            )}
            {fail ? (
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"???????????????????????????????????????????????????"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    textAlign={"center"}
                    id="alert-dialog-description"
                  >
                    ?????? SerialNumber ????????????????????????
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button fullWidth onClick={handleRefresh} autoFocus>
                    ????????????
                  </Button>
                </DialogActions>
              </Dialog>
            ) : (
              <> </>
            )}
                    {fail2 ? (
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"???????????????????????????????????????????????????"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    textAlign={"center"}
                    id="alert-dialog-description"
                  >
                   ???????????????????????????????????????????????????
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button fullWidth onClick={handleRefresh} autoFocus>
                    ????????????
                  </Button>
                </DialogActions>
              </Dialog>
            ) : (
              <> </>
            )}
            <Grid
            style={{color:'black'}}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            >
              <Grid item xs={12} >
                {" "}
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-25">
                      <label for="fname">Device SN</label>
                    </div>
                    <div className="col-75">
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
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-25">
                      <label for="fname">Device name</label>
                    </div>
                    <div className="col-75">
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
                <InputLabel id="demo-simple-select-label">?????????????????????????????????????????????????????????</InputLabel>
                  <Select
                  fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={positionuuid}
                    label="building"
                    onChange={handleChange}
                  >
                    {data}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <hr></hr>
          <br />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={createDevice}>
              ????????????
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              ??????????????????
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
              <Button variant="contained">???????????????</Button>
            </Stack>
          </Grid>
          <Grid item md={8} xs={12}></Grid>
          <Grid item md={2} xs={12}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleOpen}>
                ???????????????
              </Button>
              <Button
                onClick={deletemanypeople}
                variant="contained"
                color="error"
              >
                ??????
              </Button>
           
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={16} style={{ paddingTop: 10 }}>
          <Grid item md={16} xs={16}>
            <DeviceTable Selec={Selec} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Device;
