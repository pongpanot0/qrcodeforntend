import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TableHouse from "./BuildingUnitTable";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Buildingtree from "./Buildingtree";

import Roomcreate from "./Roomcreate";
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

const ariaLabel = { "aria-label": "description" };

export default function BuildingUnit() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [err, setError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [fail, setfail] = React.useState(false);
  const createbuild = (e) => {
    e.preventDefault();
    setError(true);
    const user_id = localStorage.getItem("user_id");
    const items = localStorage.getItem("company_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/createbuild/${items}`, {
        name: name,
        code: code,
        create_by: user_id,
      })
      .then((res) => {
        if (res.data.code === 10000) {
          setError(false);
          setOpen2(true);
          setfail(true);
          window.location.reload(false);
        }
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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpen2 = () => {
    setOpen3(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getExcel = (e) => {
    const items = localStorage.getItem("company_id");

    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_API_KEY}/exportsBuilding/${items}`, //your url
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

  return (
    <>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          {fail ? (
            <Dialog
              open={open2}
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
                  ชื่อหรือเลขที่ห้องมีอยู่แล้ว
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
          <h2 id="parent-modal-title">New unit</h2>
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
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-25">
                      <label for="fname">ชื่อตึก</label>
                    </div>
                    <div className="col-50">
                      <TextField
                        type="text"
                        fullWidth
                        id="fname"
                        name="firstname"
                        placeholder="Your name.."
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
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={open3}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Roomcreate />
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
              <Button variant="contained">Submit</Button>
            </Stack>
          </Grid>
          <Grid item md={8} xs={12}></Grid>
          <Grid item md={8} xs={12}>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={handleOpen}>
                เพิ่มโซน
              </Button>
              <Button variant="contained" onClick={handleOpen2}>
                เพิ่มโซนสาขา
              </Button>
              <Button variant="contained" onClick={getExcel} color="error">
                Export
              </Button>
            </Stack>
          </Grid>

          <Buildingtree />
        </Grid>
      </Box>
    </>
  );
}
