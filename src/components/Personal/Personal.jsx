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

import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Modal from "@mui/material/Modal";
import Fileupload from "./Fileupload";
import { Typography } from "antd";
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
function Personal() {
  const [err, setError] = React.useState(false);
  const [username, setusername] = React.useState("");
  const [first_name, setFirst_name] = React.useState("");
  const [last_name, setlast_name] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const [room2, setRoom2] = React.useState("");
  const [room3, setRoom3] = React.useState("");
  const [open6, setOpen6] = React.useState(false);

  console.log(room3);
  const Selec2 = (event) => {
    setRoom3(event);
  };
  const Selec = (event) => {
    setRoom2(event);
  };
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
    setOpen3(false);
    setOpen4(false);
    setOpen6(false);
  };
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const handleOpen2 = () => {
    setOpen4(true);
  };
  const handleOpen3 = () => {
    setOpen6(true);
  };
  const handleOpen = () => {
    setOpen3(true);
  };
  const deletemanypeople = (e) => {
    setError(true);
    setOpen(true);

    axios
      .post(`${process.env.REACT_APP_API_KEY}/DeleteManypersonal`, {
        id: room2,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setOpen(false);
          setOpen(false);
          setOpen2(false);
          setOpen3(false);
          window.location.reload(false);
        }
        if (res.data.status === 400) {
          setOpen2(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getExcel = (e) => {
    const items = localStorage.getItem("company_id");
    setError(true);
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_API_KEY}/exportsperson/${items}`, //your url
      method: "POST",
      responseType: "blob", // important
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Person${items}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
      setError(false);
    });
  };

  const createpersonal = () => {
    setError(true);
    setOpen(true);
    const items = localStorage.getItem("company_id");
    const position = localStorage.getItem("position");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/createpersonal`, {
        password: password,
        company_id: items,
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        permission: checked,
        position: position,
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
          setOpen3(false);
          window.location.reload(false);
        }
        if (res.data.status === 400) {
          setOpen2(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const editManypersonal = () => {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/updateManyUser`, {
        id: room2,
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
          setOpen3(false);
          window.location.reload(false);
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
            <Modal
              open={open4}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Fileupload />
            </Modal>{" "}
            <Modal
              open={open3}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
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
                      name="firstname"
                      variant="standard"
                      label="ชื่อ"
                      required
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
                      label="Username"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setusername(e.target.value);
                      }}
                    />
                    <TextField
                      style={{ marginTop: 50 }}
                      margin="dense"
                      fullWidth
                      required
                      variant="standard"
                      label="Password"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setpassword(e.target.value);
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                    />
                  </div>

                  <Grid item xs={12} sm={4} md={3} alignItems="start">
                    {" "}
                    <h1>เปิดประตูด้วย</h1>
                    <FormControl
                      component="fieldset"
                      variant="standard"
                      fullWidth
                    >
                      <FormGroup
                        style={{
                          textAlign: "left",
                          alignContent: "start",
                          alignItems: "start",
                          alignSelf: "left",
                        }}
                        fullWidth
                      >
                        <FormControlLabel
                          fullWidth
                          style={{ marginTop: 50 }}
                          control={
                            <Switch
                              size="medium"
                              fullWidth
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
                    <FormControl component="fieldset" variant="standard">
                      <FormGroup>
                        <FormControlLabel
                          style={{ marginTop: 50, float: "left" }}
                          control={
                            <Switch
                              style={{}}
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
                    <FormControl component="fieldset" variant="standard">
                      <FormGroup>
                        <FormControlLabel
                          style={{ marginTop: 50, float: "left" }}
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
            </Modal>
            <Modal
              open={open6}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
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
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    "& .MuiTextField-root": { m: 2 },
                  }}
                  fullWidth
                  spacing={3}
                >
                  <Grid item xs={12} sm={12} md={12}>
                    {" "}
                    <h1>เปิดประตูด้วย</h1>
                    <Grid  xs={12} sm={12} md={12}>
                      <FormControl
                        component="fieldset"
                        variant="standard"
                        fullWidth
                      >
                        <FormGroup fullWidth>
                          <FormControlLabel
                            fullWidth
                            control={
                              <Switch
                                size="medium"
                                fullWidth
                                checked={checked}
                                onChange={handleChange}
                              />
                            }
                            label={<Typography>ใช้งานด้วยQrcode</Typography>}
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid  xs={12} sm={12} md={12}>
                      <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                          <FormControlLabel
                            style={{ marginTop: 50 }}
                            control={
                              <Switch
                                fullWidth
                                checked={checked2}
                                onChange={handleChange2}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            }
                            label={<Typography>ใช้งานด้วยบัตร</Typography>}
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid  xs={12} sm={12} md={12}>
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
                          label={<Typography>ใช้งานด้วยรหัสผ่าน</Typography>}
                        />
                      </FormGroup>
                    </FormControl>
                    </Grid>
                    <Grid  xs={12} sm={12} md={12}>
                    <FormControl component="fieldset" variant="standard">
                      <FormGroup>
                        <FormControlLabel
                          style={{ marginTop: 50 }}
                          control={
                            <Switch
                              fullWidth
                              checked={checked4}
                              onChange={handleChange4}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label={
                            <Typography
                              style={{
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
                  </Grid>

                  <Button
                    onClick={editManypersonal}
                    style={{ width: 1010, marginTop: 25 }}
                    variant="contained"
                  >
                    Submit
                  </Button>
                  <br></br>
                </Box>
                <br></br>
              </Box>
            </Modal>
            <br></br>
            <Button
              style={{ marginLeft: 10 }}
              variant="contained"
              onClick={handleOpen}
              color="success"
            >
              เพิ่ม
            </Button>
            <Button
              style={{ marginLeft: 10, background: "#ff1744" }}
              variant="contained"
              onClick={deletemanypeople}
            >
              ลบ
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: 10 }}
              onClick={getExcel}
            >
              ส่งออก
            </Button>
            <Button
              component="label"
              style={{ marginLeft: 10, background: "" }}
              variant="contained"
              onClick={handleOpen2}
            >
              นำเข้า
            </Button>
            <Button
              style={{ marginLeft: 10, background: "#fb8c00" }}
              variant="contained"
              onClick={handleOpen3}
            >
              อัปเดตพร้อมกัน
            </Button>
            <PersonTable
              createpersonal={createpersonal}
              Selec={Selec}
              Selec2={Selec2}
            />
          </Grid>
          <Grid item xs={0} sm={2} md={2}></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Personal;
