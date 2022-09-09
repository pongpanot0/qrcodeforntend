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
  const [positionuuid, setpositionuuid] = React.useState("");
  const [accDoorNo, setaccDoorNo] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [building, setBuilding] = React.useState([]);
  const [fail, setfail] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };
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

        create_by: user_id,
        accDoorNo: accDoorNo,
      })
      .then((res) => {
        if (res.data.code === 0) {
          handleClose();
          window.location.reload(false);
        }
        if (res.data.status === 400) {
          setErr(false);
          setfail(true);
          console.log("มี Device อยู๋แล้ว");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getExcel = (e) => {
    const items = localStorage.getItem("company_id");
    setErr(true);
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_API_KEY}/getDevice/${items}`, //your url
      method: "POST",
      responseType: "blob", // important
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Device${items}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
      setErr(false);
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
          <h2 id="parent-modal-title">เพิ่ม</h2>
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
                  {"มีบางอย่างผิดพลาด"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    textAlign={"center"}
                    id="alert-dialog-description"
                  >
                    มี SerialNumber อยู่แล้ว
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button fullWidth onClick={handleClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            ) : (
              <> </>
            )}
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
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-25">
                      <label for="fname">DoorNumber</label>
                    </div>
                    <div className="col-75">
                      <TextField
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="DoorNumber"
                        fullWidth
                        onChange={(e) => {
                          setaccDoorNo(e.target.value);
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
            <Button variant="contained" onClick={createDevice}>
              Submit
            </Button>
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
              <Button variant="contained">ค้นหา</Button>
            </Stack>
          </Grid>
          <Grid item md={8} xs={12}></Grid>
          <Grid item md={2} xs={12}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleOpen}>
                เพิ่ม
              </Button>
              <Button variant="contained" color="error">
                ลบ
              </Button>
              <Button variant="contained" color="error">
                แก้ไข
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={16} style={{ paddingTop: 10 }}>
          <Grid item md={16} xs={16}>
            <DeviceTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Device;
