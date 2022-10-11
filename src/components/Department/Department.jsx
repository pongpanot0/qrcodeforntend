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

import Modal from "@mui/material/Modal";

import Departmenttable from "./Departmenttable";
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
function Department() {
  const [err, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [room2, setRoom2] = React.useState("");
  const [room3, setRoom3] = React.useState("");

  const [open7, setOpen7] = React.useState(false);

  console.log(room3);
  const Selec2 = (event) => {
    setRoom3(event);
  };
  const Selec = (event) => {
    setRoom2(event);
  };
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    setOpen7(false);
  };

  const handleOpen7 = () => {
    setOpen7(true);
  };
  const deletemanypeople = (e) => {
    setError(true);
    setOpen(true);

    axios
      .post(`${process.env.REACT_APP_API_KEY}/DeleteManypersonal`, {
        id: room2,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setOpen(false);
          setOpen(false);
          setOpen2(false);
          window.location.reload(false);
        }
        if (res.data.status === 400) {
          setOpen2(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [departmentname, setdepartmentname] = React.useState("");
  const [departmentseq, setdepartmentseq] = React.useState("");
  const creategroup = () => {
    setError(true);
    setOpen(true);
    const user_id = localStorage.getItem("user_id");
    const items = localStorage.getItem("company_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/createdepartment`, {
        department_name: departmentname,
        department_req: departmentseq,
        created_by: user_id,
        updated_by: user_id,
        company_id: items,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setOpen(false);
          setOpen(false);
          setOpen2(false);
          window.location.reload(false);
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
      <Box fullWidth>
        <Grid container spacing={3}>
          <Grid item xs={0} sm={2} md={2}></Grid>
          <Grid item xs={12} sm={8} md={12}>
            {/* Group */}
            <Modal
              open={open7}
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
                  <h1>เพิ่มแผนก</h1>

                  <div>
                    <TextField
                      style={{ marginTop: 50 }}
                      margin="dense"
                      fullWidth
                      required
                      variant="standard"
                      label="ชื่อแผนก"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setdepartmentname(e.target.value);
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
                      label="เพิ่มเติม"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setdepartmentseq(e.target.value);
                      }}
                    />
                  </div>
                  <Button
                    onClick={creategroup}
                    style={{ width: 500, marginTop: 25 }}
                    variant="contained"
                  >
                    ตกลง
                  </Button>
                  <Button
                    onClick={handleClose}
                    style={{
                      width: 500,
                      marginTop: 25,
                      marginLeft: 25,
                      background: "red",
                    }}
                    variant="contained"
                  >
                    ยกเลิก
                  </Button>
                  <br></br>
                </Box>
                <br></br>
              </Box>
            </Modal>
            <br></br>

            <Button
              style={{ marginLeft: 10, background: "#9033FF" }}
              variant="contained"
              onClick={handleOpen7}
            >
              เพิ่มแผนก
            </Button>
            <Button
              style={{ marginLeft: 10, background: "#ff1744" }}
              variant="contained"
              onClick={deletemanypeople}
            >
              ลบ
            </Button>

            <Departmenttable
              Selec={Selec}
              Selec2={Selec2}
            />
          </Grid>
          <Grid item xs={0} sm={2} md={2}></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Department;
