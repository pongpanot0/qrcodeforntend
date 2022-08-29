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
import DialogTitle from "@mui/material/DialogTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PersonTable from "./PersonTable";
import Personalpermission from "./Personalpermission";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Modal from "@mui/material/Modal";
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
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
  };
  const [open3, setOpen3] = React.useState(false);
  const handleOpen = () => {
    setOpen3(true);
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
  const createpersonal = (e) => {
    setOpen(true);
    e.preventDefault();
    setError(true);
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
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          setOpen(false);
        }
        if (res.data.status === 400) {
          setOpen2(true);
        }
        console.log(res);
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
            {" "}
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
                  <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Let Google help apps determine location. This means
                      sending anonymous location data to Google, even when no
                      apps are running.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                      Agree
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
                    <FormControl component="fieldset" variant="standard">
                      <FormGroup>
                        <FormControlLabel
                          style={{ marginTop: 50 }}
                          control={
                            <Switch
                              fullWidth
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label="สามารถใช้ QrCode ได้มั้ย"
                        />
                      </FormGroup>
                    </FormControl>
                  </div>

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
            <br></br>
            <Button variant="contained" onClick={handleOpen}>
              Add
            </Button>
            <Button variant="contained"  style={{ marginLeft: 10 }} onClick={getExcel}>
              Export
            </Button>
            <PersonTable />
          </Grid>
          <Grid item xs={0} sm={2} md={2}></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Personal;
