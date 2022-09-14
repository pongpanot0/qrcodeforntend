import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PersonTable from "./PersonTable";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Modal from "@mui/material/Modal";
import Fileupload from "./Fileupload";
import { Typography } from "antd";
import { useParams,useNavigate } from "react-router-dom";
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

function PersonalEdit() {
  const [err, setError] = React.useState(false);
  const [username, setusername] = React.useState("");
  const [first_name, setFirst_name] = React.useState("");
  const [last_name, setlast_name] = React.useState("");
  const [email, setemail] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const navigate = useNavigate()
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  };
  const handleChange3 = (event) => {
    setChecked3(event.target.checked);
  };
  const handleChange4 = (event) => {
    setChecked4(event.target.checked);
  };
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };
  React.useEffect(() => {
    getData();
  }, []);
  const { id } = useParams();
  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getUser/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setFirst_name(res.data.data[0].first_name);
        setlast_name(res.data.data[0].last_name);
        setemail(res.data.data[0].email);
        setusername(res.data.data[0].username);
        if (res.data.data[0].qrcode === 1) {
          setChecked(true);
        }
        if (res.data.data[0].keycard === 1) {
          setChecked2(true);
        }
        if (res.data.data[0].bluetooth === 1) {
          setChecked3(true);
        }
        if (res.data.data[0].pin === 1) {
          setChecked4(true);
        } else {
          setChecked(false);
          setChecked2(false);
          setChecked3(false);
          setChecked4(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            // Controls default (unchecked) color for the thumb
            color: "#ccc",
          },

          track: {
            // Controls default (unchecked) color for the track
            opacity: 0.2,
            backgroundColor: "#fff",
            ".Mui-checked.Mui-checked + &": {
              // Controls checked color for the track
              opacity: 0.7,
              backgroundColor: "#fff",
            },
          },
        },
      },
    },
  });
  const createpersonal = () => {
    setError(true);
    setOpen(true);
    axios
      .post(`${process.env.REACT_APP_API_KEY}/updateUser/${id}`, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        permission: checked,
        permission2: checked2,
        permission3: checked3,
        permission4: checked4,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          setOpen(false);
          setOpen(false);
          setOpen2(false);

          navigate('/dashboard/personal')
        }
        if (res.data.status === 400) {
          setOpen2(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={0} sm={2} md={2}></Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Box
              sx={{
                width: "100%",
                marginLeft: 5,
                textAlign: "center",
                ...style,
              }}
            >
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
              <Dialog
                open={open2}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    มีUsername นี่อยู่แล้ว
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    ยืนยัน
                  </Button>
                </DialogActions>
              </Dialog>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  "& .MuiTextField-root": { m: 2, width: "500px" },
                }}
                spacing={3}
              >
                <div>
                  <TextField
                    style={{ marginTop: 50 }}
                    margin="dense"
                    fullWidth
                    required
                    variant="standard"
                    label="Username"
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={username}
                    onChange={(e) => {
                      setusername(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    style={{ marginTop: 50 }}
                    margin="dense"
                    fullWidth
                    name="firstname"
                    variant="standard"
                    label="ชื่อ"
                    required
                    value={first_name}
                    onChange={(e) => {
                      setFirst_name(e.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    style={{ marginTop: 50 }}
                    margin="dense"
                    fullWidth
                    variant="standard"
                    label="นามสกุล"
                    required
                    value={last_name}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setlast_name(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <TextField
                    style={{ marginTop: 50 }}
                    margin="dense"
                    fullWidth
                    required
                    variant="standard"
                    label="email"
                    value={email}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </div>

                <Grid item xs={12} sm={12} md={12}>
                  {" "}
                  < >
                    <h1>เปิดประตูด้วย</h1>
                    <Grid  xs={6} sm={6} md={4}>
                      <FormControl
                        component="fieldset"
                        variant="standard"
                        fullWidth
                      >
                        <FormGroup
                       
                        >
                          <FormControlLabel
                            style={{ marginTop: 50 }}
                            control={
                              <Switch
                                size="medium"
                                checked={checked}
                                onChange={handleChange}
                              />
                            }
                            label={
                              <Typography
                                style={{
                                  marginLeft: 5,
                                  color: "black",
                                  opacity: 100,
                                }}
                              >
                                ใช้งานด้วยQrcode
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid xs={0} sm={5} md={6}>
                      <FormControl component="fieldset" variant="standard">
                        <FormGroup
                          style={{
                            textAlign: "left",
                            alignContent: "start",
                            alignItems: "start",
                            alignSelf: "left",
                          }}
                        >
                          <FormControlLabel
                            style={{
                              marginTop: 50,
                              textAlign: "left",
                              alignContent: "start",
                              alignItems: "start",
                              alignSelf: "left",
                            }}
                            control={
                              <Switch
                                fullWidth
                                checked={checked2}
                                onChange={handleChange2}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            }
                            label={
                              <Typography
                                style={{
                                  marginLeft: 5,
                                  color: "black",
                                  opacity: 100,
                                }}
                              >
                                ใช้งานด้วยบัตร
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid xs={0} sm={5} md={12}>
                      <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                          <FormControlLabel
                            style={{ marginTop: 50 }}
                            control={
                              <Switch
                                fullWidth
                                checked={checked3}
                                onChange={handleChange3}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            }
                            label={
                              <Typography
                                style={{
                                  marginLeft: 5,
                                  color: "black",
                                  opacity: 100,
                                }}
                              >
                                ใช้งานด้วยรหัสผ่าน
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={0} sm={5} md={12}>
                      <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                          <FormControlLabel
                            style={{ marginTop: 50 }}
                            control={
                              <Switch
                                style={{ marginLeft: 0 }}
                                fullWidth
                                checked={checked4}
                                onChange={handleChange4}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            }
                            label={
                              <Typography
                                style={{
                                  marginLeft: 5,
                                  color: "black",
                                  opacity: 100,
                                }}
                              >
                                ใช้งานด้วยบูลทูธ
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </>
                </Grid>

                <Button
                  onClick={createpersonal}
                  style={{ width: 1010, marginTop: 25 }}
                  variant="contained"
                >
                  Submit
                </Button>
                <br></br>
              </Box>
              <br></br>
            </Box>
          </Grid>
          <Grid item xs={0} sm={2} md={2}></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PersonalEdit;
