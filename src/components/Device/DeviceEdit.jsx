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
import { useParams ,useNavigate} from "react-router-dom";
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

function DeviceEdit() {
    const navigate = useNavigate()
  const { id } = useParams();
  const [devSn, setDevSn] = React.useState("");
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [positionuuid, setpositionuuid] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [building, setBuilding] = React.useState([]);
  const [fail, setfail] = React.useState(false);
  const [uuid,setuuid] = React.useState("")
  const handleClose = () => {
    setOpen(false);
    navigate('/dashboard/DeviceDisplay')
  };

  React.useEffect(() => {
    getdata();
    setErr(true);
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getbuild/${items}`)
      .then((res) => {
        setBuilding(res.data.data.data.list);
        setErr(false);
      });
  }, []);
  const getdata = () => {
    setErr(true);
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getoneDevice/${id}/${items}`)
      .then((res) => {
        if (res.data.code === 0) {
          console.log(res.data.data);
          setName(res.data.data.name);
          setpositionuuid(res.data.data.positionId);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const data = building.map((row) => {
    return <MenuItem value={row.id}>{row.name}</MenuItem>;
  });

  const createDevice = (e) => {
    e.preventDefault();
    setErr(true);
    const user_id = localStorage.getItem("user_id");
    const items = localStorage.getItem("company_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/editDevice/${id}/${items}`, {
        device_name: name,
        positionuuids: positionuuid,
        create_by: user_id,
      })
      .then((res) => {
        if (res.data.code === 0) {
          handleClose();
          setErr(false);
          window.location.reload(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
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
                  ตกลง
                </Button>
              </DialogActions>
            </Dialog>
          ) : (
            <> </>
          )}
          <Grid
            style={{ color: "black" }}
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
                      disabled
                      value={id}
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
                      value={name}
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
            {/*      <Grid item xs={12}>
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
            </Grid> */}
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-simple-select-label">
                  เรื่องสถานที่ติดตั้ง
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={positionuuid}
                  defaultValue={uuid}
                  label="building"
                  onChange={(e) => {
                    setpositionuuid(e.target.value);
                  }}
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
            ตกลง
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            ยกเลิก
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default DeviceEdit;
