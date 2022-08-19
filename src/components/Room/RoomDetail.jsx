import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

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
function RoomDetail(setUUid) {
  const [room_buildingUuid, setroom_buildingUuid] = React.useState("");
  const [room_name, setroom_name] = React.useState("");
  const [building, setBuilding] = React.useState([]);
  const [code, setCode] = React.useState("");
  const [err, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [build,setBuild] = React.useState('')

  const [back, setBack] = React.useState(false);
  const dateElement = building.map((row, i) => {
    return <MenuItem value={row.id}>{row.name}</MenuItem>;
  });
  const handleChange = (event) => {
    setroom_buildingUuid(event.target.value);
  };
  React.useEffect(() => {
    setOpen(true);
    setBack(true);
    setError(true);
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getbuild/${items}`)
      .then((res) => {
        setBuilding(res.data.data.data.list);
        setError(false);
      });
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}/getoneRoom/${items}/` +
          setUUid.setUUid
      )
      .then((res) => {
        setroom_buildingUuid(res.data.data.buildingId);
        setroom_name(res.data.data.name);
        setCode(res.data.data.code);
        setBuild(res.data.data.buildingId)
  
        setBack(false);
        setOpen(false);
      });
  }, [setUUid]);

  const handleClose = () => {
    setOpen(false);
  };

  const createbuild = (e) => {
    e.preventDefault();
    setError(true);
    const user_id = localStorage.getItem("user_id");
    const items = localStorage.getItem("company_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/createRoom/${items}`, {
        room_buildingUuid: room_buildingUuid,
        room_name: room_name,
        created_by: user_id,
        code: code,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 0) {
          setError(false);
          handleClose();
          window.location.reload(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      {" "}

      <Box sx={{ ...style, width: 800 }}>
      {back ? (
    
    <CircularProgress color="inherit" className="centered" />

) : (
  <>
  
   
  </>
)}
        <h2 id="parent-modal-title">New Room</h2>
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
                <div className="row" style={{ width: "100%" }}>
                  <div className="col-25">
                    <label for="fname">ตึก</label>
                  </div>
                  <div className="col-50">
                    <FormControl fullWidth style={{ width: "100%" }}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={build}
                        label="Age"
                        onChange={handleChange}
                        fullWidth
                      >
                        {dateElement}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <br></br>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <div className="row" style={{ width: "100%" }}>
                  <div className="col-25">
                    <label for="fname">RoomName</label>
                  </div>
                  <div className="col-75">
                    <TextField
                      type="text"
                      id="fname"
                      name="firstname"
                      placeholder="Your name.."
                      fullWidth
                      value={room_name}
                      

                      onChange={(e) => {
                        setroom_name(e.target.value);
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
                  <div className="col-30">
                    <label for="fname">RoomNum</label>
                  </div>
                  <div className="col-50">
                    <TextField
                      type="text"
                      id="fname"
                      name="firstname"
                      placeholder="ใส่ได้เฉพาะตัวเลข"
                      fullWidth
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
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
          <Button variant="contained" onClick={createbuild}>
            Submit
          </Button>
          <Button variant="outlined">Reset</Button>
        </Stack>
      </Box>
    </div>
  );
}

export default RoomDetail;
