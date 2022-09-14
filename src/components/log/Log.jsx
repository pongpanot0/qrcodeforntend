import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import Logtable from "./Logtable";
import { Button } from "@mui/material";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Log() {
  const [open, setOpen] = React.useState(false);
  const [value2, setValue2] = React.useState(moment());
  const [value3, setValue3] = React.useState(moment());
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log(value3._d);
  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem("keys");
    return stickyValue !== null ? JSON.parse(stickyValue) : 0;
  });
  const handleChange = (event, newValue) => {
    console.log(newValue);
    localStorage.setItem("keys", newValue);
    setValue(newValue);
  };
  const getExcel = (e) => {
    const items = localStorage.getItem("company_id");

    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_API_KEY}/exportslogdevice/${items}`, //your url
      method: "POST",
      responseType: "blob", // important
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Log${items}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };
  const exportslogdevicewithdate = (e) => {
    const items = localStorage.getItem("company_id");

    e.preventDefault();
    axios(
      {
        url: `${process.env.REACT_APP_API_KEY}/exportslogdevicewithdate/${items}/${value2}/${value3}`, //your url
        method: "POST",
        responseType: "blob", // important
      },
    ).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Log${items}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={0} sm={2} md={2}></Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Item>
            {" "}
            <Box sx={{ width: "100%" }}>
              <Button variant="contained" color="error" onClick={getExcel}>
                Export
              </Button>
              <Button
                style={{ marginLeft: 5 }}
                variant="contained"
                color="error"
                onClick={handleClickOpen}
              >
                Exportแบบเลือกวัน
              </Button>
              <div>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"ออกรายงานแบบเลือกเอง"}</DialogTitle>
                  <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        views={["year", "month", "day"]}
                        value={value2}
                        inputFormat="DD/MM/YYYY"
                        onChange={(newValue) => {
                          setValue2(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            helperText={"วันที่เริ่มต้น"}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        views={["year", "month", "day"]}
                        value={value3}
                        inputFormat="DD/MM/YYYY"
                      
                        onChange={(newValue) => {
                          console.log(newValue)
                          setValue3(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            style={{ marginLeft: 5 }}
                            {...params}
                            helperText={"วันที่สิ้นสุด"}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={exportslogdevicewithdate}>Export</Button>
                  </DialogActions>
                </Dialog>
              </div>
              <Logtable />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={0} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
}
