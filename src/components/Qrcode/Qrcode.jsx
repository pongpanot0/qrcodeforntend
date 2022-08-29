import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import QrcodeTable from "./QrcodeTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

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

export default function Qrcode() {
  const [open, setOpen] = React.useState(false);
  const [usableCount, setusableCount] = React.useState("");
  const [startDate, setstartDate] = React.useState(new Date());
  const [endDate, setendDate] = React.useState(new Date());
  const [visitor_name, setvisitor_name] = React.useState("");
  const [device, setDevice] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const m = value.map((m) => m.devSn);
  const navigate = useNavigate();
  console.log(startDate);
  React.useEffect(() => {
    getDevice();
  }, []);
  const getDevice = (e) => {
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getdeviceuuid/${items}`)

      .then((res) => {
        setDevice(res.data.data.list);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getExcel = (e) => {
    const items = localStorage.getItem("company_id");
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_API_KEY}/exportsvisitor/${items}`, //your url
      method: "POST",
      responseType: "blob", // important
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${items}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };
  const createbuild = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const items = localStorage.getItem("company_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/createVisitor/${items}`, {
        devsns: m,
        usableCount: usableCount,
        startDate: startDate,
        endDate: endDate,
        visitor_name: visitor_name,
        created_by: user_id,
      })

      .then((res) => {
        console.log(res.data.data);
        if (res.data.status === 200) {
          navigate("/publiclink/qrcodeshow/" + res.data.data.insertId);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={0} sm={2} md={2}></Grid>
        <Grid item xs={12} sm={8} md={8}>
          {" "}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 650 }}>
                  <h2 id="parent-modal-title">New Visitor</h2>
                  <br></br>
                  <hr></hr>
                  <br></br>

                  <h4 id="parent-modal-description">Visitor name</h4>
                  <FormControl sx={{ m: 1, width: "100%" }}>
                    <TextField
                      id="outlined-basic"
                      required
                      fullWidth
                      variant="outlined"
                      onChange={(e) => {
                        setvisitor_name(e.target.value);
                      }}
                    />
                  </FormControl>

                  <h4 id="parent-modal-description">Device name</h4>
                  <FormControl sx={{ m: 1, width: "100%" }}>
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      multiple
                      id="tags-filled"
                      options={device}
                      getOptionLabel={(option) => option.name}
                      freeSolo
                      fullWidth
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          variant="outlined"
                          label="Device"
                          placeholder="Search"
                        />
                      )}
                    />
                  </FormControl>
              
                  <FormControl sx={{ width: "100%" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        ampm={false}
                        renderInput={(props) => <TextField {...props} />}
                        inputFormat="dd/MM/yyyy HH:mm"
                        defaultValue={startDate}
                        label="StartDate"
                        value={startDate}
                        onChange={(newValue) => {
                          setstartDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>

            
                  <FormControl sx={{ width: "100%" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        ampm={false}
                        inputFormat="dd/MM/yyyy HH:mm"
                        renderInput={(props) => <TextField {...props} />}
                        label="EndDate"
                        value={endDate}
                        onChange={(newValue) => {
                          setendDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>

                  <h4 id="parent-modal-description">Usable times</h4>
                  <FormControl sx={{ m: 1, width: "100%" }}>
                    <TextField
                      id="outlined-basic"
                      required
                      fullWidth
                      type="number"
                      variant="outlined"
                      onChange={(e) => {
                        setusableCount(e.target.value);
                      }}
                    />
                  </FormControl>

                  <br></br>
                  <br></br>
                  <hr></hr>
                  <br></br>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={createbuild}>
                      CreateQrcode
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Box>
          </Box>
          <br></br>
          <Button variant="contained" onClick={handleOpen}>
            Open
          </Button>
          <Button
            variant="contained"
            onClick={getExcel}
            style={{ marginLeft: 5 }}
          >
            exports
          </Button>
          <QrcodeTable />
        </Grid>
        <Grid item xs={0} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
}
