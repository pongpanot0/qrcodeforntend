import React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import FormControl from "@mui/material/FormControl";

import TextField from "@mui/material/TextField";
import RoomTable from "./RoomTable";
import "./Room.css";
import RoomTree from "./RoomTree";
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  color: theme.palette.text.secondary,
}));
const ariaLabel = { "aria-label": "description" };
function Floor() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
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
              <Grid item xs={6}>
                {" "}
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div class="row">
                    <div class="col-30">
                      <label for="fname">ตึก</label>
                    </div>
                    <div class="col-50">
                      <TextField
                      width="100%"
                        type="text"
                        id="fname"
                        fullWidth
                        name="firstname"
                        placeholder="Your name.."
                      />
                    </div>
                  </div>
                  <br></br>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div class="row">
                    <div class="col-30">
                      <label for="fname">RoomName</label>
                    </div>
                    <div class="col-50">
                      <TextField
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Your name.."
                      />
                    </div>
                  </div>
                  <br></br>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div class="row">
                    <div class="col-30">
                      <label for="fname">RoomNum</label>
                    </div>
                    <div class="col-50">
                      <TextField
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="ใส่ได้เฉพาะตัวเลข"
                        fullWidth
                      />
                    </div>
                  </div>
                  <br></br>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div class="row">
                    <div class="col-30">
                      <label for="fname">ชั้น</label>
                    </div>
                    <div class="col-50">
                      <TextField
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Your name.."
                        fullWidth
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
              <Button variant="outlined">Reset</Button>
            </Stack>
        </Box>
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
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            </Stack>
          </Grid>
          <Grid item md={8} xs={12}></Grid>
          <Grid item md={2} xs={12}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleOpen}>
                Add
              </Button>
              <Button variant="contained" color="error" >
                Delete
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={16} style={{ paddingTop: 10 }}>
          <Grid item md={4} xs={12}>
            <Item>
              <RoomTree />
            </Item>
          </Grid>
          <Grid item md={12} xs={16}>
            <RoomTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Floor;
