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
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import axios from "axios";
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
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
const ariaLabel = { "aria-label": "description" };

export default function BuildingUnit() {
  const [open, setOpen] = React.useState(false);
  const [err, setError] = React.useState(false);

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
              <Grid item xs={6}>
                {" "}
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div class="row" style={{ width: "100%" }}>
                    <div class="col-25">
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
                  <div class="row" style={{ width: "100%" }}>
                    <div class="col-25">
                      <label for="fname">Name</label>
                    </div>
                    <div class="col-50">
                      <TextField
                        type="text"
                        fullWidth
                        id="fname"
                        name="firstname"
                        placeholder="Your name.."
                      />
                    </div>
                  </div>
                  <br></br>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div class="row" style={{ width: "100%" }}>
                    <div class="col-25">
                      <label for="fname">DoorNum</label>
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
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div class="row" style={{ width: "100%" }}>
                    <div class="col-25">
                      <label for="fname">Authorized community door</label>
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
              <Root>
                <Divider>Door information</Divider>
              </Root>

              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <div class="row" style={{ width: "100%" }}>
                    <div class="col-25">
                      <label for="fname">Door name1</label>
                    </div>
                    <div class="col-50">
                      <TextField
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Door name"
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
            <Button variant="outlined" onClick={handleClose}>
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
          <TableHouse />
        </Grid>
      </Box>
    </>
  );
}
