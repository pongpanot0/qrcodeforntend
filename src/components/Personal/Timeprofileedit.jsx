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
import { useParams, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
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

function Timeprofileedit() {
  const [err, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const [checked5, setChecked5] = React.useState(false);
  const [checked6, setChecked6] = React.useState(false);
  const [checked7, setChecked7] = React.useState(false);
  const [disabled, setdisabled] = React.useState(true);
  const [disabled2, setdisabled2] = React.useState(true);
  const [disabled3, setdisabled3] = React.useState(true);
  const [disabled4, setdisabled4] = React.useState(true);
  const [disabled5, setdisabled5] = React.useState(true);
  const [disabled6, setdisabled6] = React.useState(true);
  const [disabled7, setdisabled7] = React.useState(true);
  const [timeprofile_name, settimeprofile_name] = React.useState("");

  const navigate = useNavigate();
  const handleChange = (event) => {
    setChecked(event.target.checked);
    setdisabled(!disabled);
  };
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
    setdisabled2(!disabled2);
  };
  const handleChange3 = (event) => {
    setChecked3(event.target.checked);
    setdisabled3(!disabled3);
  };
  const handleChange4 = (event) => {
    setChecked4(event.target.checked);
    setdisabled4(!disabled4);
  };
  const handleChange5 = (event) => {
    setChecked5(event.target.checked);
    setdisabled5(!disabled5);
  };
  const handleChange6 = (event) => {
    setChecked6(event.target.checked);
    setdisabled6(!disabled6);
  };
  const handleChange7 = (event) => {
    setChecked7(event.target.checked);
    setdisabled7(!disabled7);
  };
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };
  React.useEffect(() => {
    getData();
  }, []);
  const { id } = useParams();
  const [value, setValue] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const [value3, setValue3] = React.useState(null);
  const [value4, setValue4] = React.useState(null);
  const [value5, setValue5] = React.useState(null);
  const [value6, setValue6] = React.useState(null);
  const [value7, setValue7] = React.useState(null);
  const [value8, setValue8] = React.useState(null);
  const [value9, setValue9] = React.useState(null);
  const [value10, setValue10] = React.useState(null);
  const [value11, setValue11] = React.useState(null);
  const [value12, setValue12] = React.useState(null);
  const [value13, setValue13] = React.useState(null);
  const [value14, setValue14] = React.useState(null);
  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getDetailprofile/${id}`)
      .then((res) => {
        console.log(res.data.data);
        settimeprofile_name(res.data.data[0].timeprofile_name);
        setValue(res.data.data[0].monday_time);
        setValue2(res.data.data[0].tuesday_time);
        setValue3(res.data.data[0].wednesday_time);
        setValue4(res.data.data[0].thursday_time);
        setValue5(res.data.data[0].friday_time);
        setValue6(res.data.data[0].saturday_time);
        setValue7(res.data.data[0].sunday_time);
        setValue8(res.data.data[0].monday_time_to);
        setValue9(res.data.data[0].tuesday_time_to);
        setValue10(res.data.data[0].wednesday_time_to);
        setValue11(res.data.data[0].thursday_time_to);
        setValue12(res.data.data[0].friday_time_to);
        setValue13(res.data.data[0].saturday_time_to);
        setValue14(res.data.data[0].sunday_time_to);
        if (res.data.data[0].monday === 1) {
          setChecked(true);
        }
        if (res.data.data[0].tuesday === 1) {
          setChecked2(true);
        }
        if (res.data.data[0].wednesday === 1) {
          setChecked3(true);
        }
        if (res.data.data[0].thursday === 1) {
          setChecked4(true);
        }
        if (res.data.data[0].friday === 1) {
          setChecked5(true);
        }
        if (res.data.data[0].saturday === 1) {
          setChecked6(true);
        }
        if (res.data.data[0].sunday === 1) {
          setChecked7(true);
        } 
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const createpersonal = () => {
    const user_id = localStorage.getItem("user_id");
    const company_id = localStorage.getItem("company_id");
    setError(true);
    setOpen(true);
    axios
      .post(`${process.env.REACT_APP_API_KEY}/edittimeprofile/${id}`, {
        timeprofile_name: timeprofile_name,
        monday: checked,
        tuesday: checked2,
        wednesday: checked3,
        thursday: checked4,
        friday: checked5,
        saturday: checked6,
        sunday: checked7,
        monday_time: value,
        tuesday_time: value2,
        wednesday_time: value3,
        thursday_time: value4,
        friday_time: value5,
        saturday_time: value6,
        sunday_time: value7,
        monday_time_to: value8,
        tuesday_time_to: value9,
        wednesday_time_to: value10,
        thursday_time_to: value11,
        friday_time_to: value12,
        saturday_time_to: value13,
        sunday_time_to: value14,
        created_by: user_id,
        updated_by: user_id,
        company_id: company_id,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setOpen(false);
          setOpen(false);
          setOpen2(false);
          navigate("/dashboard/personal");
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
                <h1>TimeProfile</h1>
                <div>
                  <TextField
                    style={{ marginTop: 50 }}
                    margin="dense"
                    fullWidth
                    required
                    variant="standard"
                    label="Timeprofilename"
                    value={timeprofile_name}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      settimeprofile_name(e.target.value);
                    }}
                  />
                </div>
                <br></br>
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={7}>
                    <h1>กรุณาเลือกวัน</h1>
                  </Grid>
                  <Grid item xs={7}>
                    <h1>กรุณาเลือกเวลา</h1>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      checked={checked}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      วันจันทร์
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value}
                        disabled={disabled}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    marginLeft={12}
                    item
                    xs={4}
                    borderRadius={"bold"}
                    borderColor={"black"}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value8}
                        disabled={disabled}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue8(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      checked={checked2}
                      onChange={handleChange2}
                      label=""
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      วันอังคาร
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value2}
                        disabled={disabled2}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue2(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    marginLeft={12}
                    item
                    xs={4}
                    borderRadius={"bold"}
                    borderColor={"black"}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value9}
                        disabled={disabled2}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue9(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label=""
                      checked={checked3}
                      onChange={handleChange3}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      วันพุธ
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value3}
                        disabled={disabled3}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue3(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    marginLeft={12}
                    item
                    xs={4}
                    borderRadius={"bold"}
                    borderColor={"black"}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value10}
                        disabled={disabled3}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue10(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      checked={checked4}
                      onChange={handleChange4}
                      label=""
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      วันพฤหัสบดี
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value4}
                        disabled={disabled4}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue4(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    marginLeft={12}
                    item
                    xs={4}
                    borderRadius={"bold"}
                    borderColor={"black"}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value11}
                        disabled={disabled4}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue11(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label=""
                      checked={checked5}
                      onChange={handleChange5}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      วันศุกร์
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value5}
                        disabled={disabled5}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue12(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    marginLeft={12}
                    item
                    xs={4}
                    borderRadius={"bold"}
                    borderColor={"black"}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value12}
                        disabled={disabled5}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue5(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label=""
                      checked={checked6}
                      onChange={handleChange6}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      วันเสาร์
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value6}
                        disabled={disabled6}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue6(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    marginLeft={12}
                    item
                    xs={4}
                    borderRadius={"bold"}
                    borderColor={"black"}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value13}
                        disabled={disabled6}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue13(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label=""
                      disabled={false}
                      checked={checked7}
                      onChange={handleChange7}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      วันอาทิตย์
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value7}
                        disabled={disabled7}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue7(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    marginLeft={12}
                    item
                    xs={4}
                    borderRadius={"bold"}
                    borderColor={"black"}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value14}
                        disabled={disabled7}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue14(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
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

export default Timeprofileedit;
