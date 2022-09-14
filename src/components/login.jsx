import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };
  const [open, setOpen] = React.useState(false);
  const Login = () => {
    setOpen(true);
    axios
      .post(`${process.env.REACT_APP_API_KEY}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          localStorage.setItem("logged_in_status", JSON.stringify(true));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.user[0].user_id);
          localStorage.setItem("uuid", res.data.user[0].uuid);
          localStorage.setItem("email", res.data.user[0].email);
          localStorage.setItem("company_id", res.data.user[0].company_id);
          localStorage.setItem("position", res.data.user[0].position);
          localStorage.setItem("first_name", res.data.user[0].first_name);
          localStorage.setItem("last_name", res.data.user[0].last_name);

          setTimeout(() => {
            setOpen(false);
            navigate("/dashboard", { replace: true });
          }, "1000");
        }
        if (res.data.status === 400) {
          setOpen2(true);
        }
      });
  };
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open2, setOpen2] = React.useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
  };

  const logoutTimerIdRef = React.useRef(null);

  React.useEffect(() => {
    const autoLogout = () => {
      if (document.visibilityState === "hidden") {
        const timeOutId = window.setTimeout(logout, 600 * 600 * 1000);
        logoutTimerIdRef.current = timeOutId;
      } else {
        window.clearTimeout(logoutTimerIdRef.current);
      }
    };

    document.addEventListener("visibilitychange", autoLogout);

    return () => {
      document.removeEventListener("visibilitychange", autoLogout);
    };
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {open ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" className="centered" />
        </Backdrop>
      ) : (
        <> </>
      )}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Dialog
          open={open2}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
       
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ชื่อหรือรหัสผ่านไม่ถูกต้อง
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              เข้าใจแล้ว
            </Button>
          </DialogActions>
        </Dialog>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1659787050050-d5aa2b1ec0dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=818&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid id="login" item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={Login}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
