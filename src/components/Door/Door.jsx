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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import DoorTable from "./DoorTable";
import DoorTree from "./DoorTree";

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
function Door() {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
        <Box  sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">New door</h2>
          <br></br>
          <hr></hr>
          <br></br>
          <br></br>
          <h4 id="parent-modal-description">Installation location</h4>
          <FormControl sx={{ m: 1, width: "100%" }}>
            
            <Select
           
              value={age}
              onChange={handleChange}
              fullWidth
              label="Age"
              required
              variant="outlined"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Twenty</MenuItem>
            </Select>
            <br></br>
          </FormControl>

          <h4 id="parent-modal-description">Door name</h4>
          <FormControl sx={{ m: 1, width: "100%" }} >
            <TextField
              id="outlined-basic"
              required
              fullWidth
              variant="outlined"
              helperText="The door name will be displayed in the APP [Mobile Door Open] list. Enter up to 20 characters"
            />
          </FormControl>
          <br></br>
          <br></br>
          <hr></hr>
          <br></br>
          <Stack direction="row" spacing={2}>
            <Button variant="contained">Add</Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
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
              <Button variant="outlined">Reset</Button>
            </Stack>
          </Grid>
          <Grid item md={8} xs={12}></Grid>
          <Grid item md={2} xs={12}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleOpen}>
                Add
              </Button>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={16} style={{ paddingTop: 10 }}>
          <Grid item md={4} xs={12}>
            <Item>
              <DoorTree />
            </Item>
          </Grid>
          <Grid item md={12} xs={16}>
            <DoorTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Door;
