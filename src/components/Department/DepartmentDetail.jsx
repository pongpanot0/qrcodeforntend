import React from "react";
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

import { useParams, useNavigate } from "react-router-dom";
import Departmenttable from "./DepartmentDetailTable";
import DepartmentDetailtab from "./DepartmentDetailtab";

function DepartmentDetail() {
  const [err, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [open7, setOpen7] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    setOpen7(false);
  };
  const { id } = useParams();
  React.useEffect(() => {
    setError(true);
    getdata();
  }, []);
  const [departmentname, setdepartmentname] = React.useState("");
  const [departmentseq, setdepartmentseq] = React.useState("");
  const getdata = () => {
    setError(false);
    setOpen(true);

    axios
      .get(`${process.env.REACT_APP_API_KEY}/getdepartmentdetail/${id}`)
      .then((res) => {
        setdepartmentname(res.data.data[0].department_name);
        setdepartmentseq(res.data.data[0].department_req);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const creategroup = () => {
    setError(true);
    setOpen(true);
    const user_id = localStorage.getItem("user_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/editdepartment`, {
        department_name: departmentname,
        department_req: departmentseq,
        updated_by: user_id,
        id:id
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
  const navigate = useNavigate();

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

  return (
    <>
      {" "}
      <Box fullWidth>
        <Grid container spacing={3}>
          <Grid item xs={0} sm={2} md={2}></Grid>
          <Grid item xs={12} sm={8} md={12}>
            {/* Group */}

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
                <h1>แก้ไขแผนก</h1>

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
                    value={departmentname}
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
                    value={departmentseq}
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

              <DepartmentDetailtab id={id} />
            </Box>

            <br></br>
          </Grid>
          <Grid item xs={0} sm={2} md={2}>
            {" "}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DepartmentDetail;
