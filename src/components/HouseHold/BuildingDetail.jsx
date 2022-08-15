import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function BuildingDetail(setUUid) {
  const [err, setError] = useState([]);
  const [items, setItems] = useState("");
  const [bulding, setBuilding] = useState([]);
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [back, setBack] = React.useState(false);
  const handleClose = () => {
    window.location.reload(false);
  };
 
  React.useEffect(() => {
    setOpen(true);
    setBack(true);
    const items = localStorage.getItem("company_id");
    if (items) {
      setItems(items);
    }
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}/getonebuildunit/${items}/` +
          setUUid.setUUid
      )
      .then((res) => {
        setName(res.data.data.name);
        setCode(res.data.data.code);
        setBuilding(res.data.data);
        setBack(false);
        setOpen(false);
      });
  }, [setUUid]);
  return (
    <Box sx={{ ...style, width: 800 }}>
      {back ? (
    
          <CircularProgress color="inherit" className="centered" />
     
      ) : (
        <>
        
         
        </>
      )}
      <h2 id="parent-modal-title">New unit</h2>
      <br></br>
      <hr></hr>
      <br></br>

      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <div className="row" style={{ width: "100%" }}>
                <div className="col-25">
                  <label for="fname"> ชื่อตึก</label>
                </div>
                <div className="col-50">
                  <TextField
                    type="text"
                    fullWidth
                    id="fname"
                    name="firstname"
                    placeholder="Your name.."
                    value={name}
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
                  <label for="fname">Door number</label>
                </div>
                <div className="col-75">
                  <TextField
                    type="number"
                    id="fname"
                    name="ใส่ได้เฉพาะตัวเลข"
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
        <Button variant="contained">Submit</Button>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
      </Stack>
    </Box>
  );
}

export default BuildingDetail;
