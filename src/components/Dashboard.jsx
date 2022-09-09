import * as React from "react";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue, red } from "@mui/material/colors";
import Chart from "./Chart/Chart";
import axios from "axios";
import Deviceshow from "./Device/Deviceshow";
export default function Dashboard() {
  const [deviceLenght, SetdeviceLengnt] = React.useState([]);
  const [buildingUnit, setBuildingUnit] = React.useState([]);
  const [room, setRoom] = React.useState([]);
  const [person, setPerson] = React.useState([]);
  React.useEffect(() => {
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getDeviceLenght/${items}`)
      .then((res) => {
        SetdeviceLengnt(res.data.totalCount);
      });
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getbuild/${items}`)
      .then((res) => {
        setBuildingUnit(res.data.data.data.totalCount);
      });
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getRoom/${items}`)
      .then((res) => {
        console.log(res);
        setRoom(res.data.data.totalCount);
      });
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getperson/${items}`)
      .then((res) => {
        console.log(res);
        setPerson(res.data.length);
      });
  }, []);

  console.log(person);
  const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",

    color: "white",
  }));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={0} sm={2} md={2}></Grid>
        <Grid item xs={12} sm={8} md={8}>
          {" "}
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Item>
                {" "}
                <Card
                  sx={{
                    maxWidth: 345,
                    background:
                      " linear-gradient(211deg, rgba(103,103,255,1) 0%, rgba(255,255,255,1) 100%);",
                  }}
                >
                  <CardHeader
                    title="จำนวนสมาชิกทั้งหมด"
                    subheader={"Employees"}
                    variant="h6"
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        E
                      </Avatar>
                    }
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {person} คน
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={12} md={3}>
              <Item>
                {" "}
                <Card
                  sx={{
                    maxWidth: 345,
                    background:
                      " linear-gradient(211deg, rgba(255,215,103,1) 0%, rgba(255,255,255,1) 100%)",
                  }}
                >
                  <CardHeader
                    title="จำนวน Device ทั้งหมด"
                    subheader={"Device"}
                    avatar={
                      <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        D
                      </Avatar>
                    }
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {deviceLenght} ชิ้น
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={12} md={3}>
              <Item>
                {" "}
                <Card
                  sx={{
                    maxWidth: 345,
                    background:
                      " linear-gradient(211deg, rgba(255,76,0,1) 0%, rgba(221,221,221,1) 100%)",
                  }}
                >
                  <CardHeader
                    title="จำนวน Building ทั้งหมด"
                    subheader={"Building"}
                    style={{ fontSize: 50 }}
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        B
                      </Avatar>
                    }
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {buildingUnit}
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={12} md={3}>
              <Item>
                {" "}
                <Card
                  sx={{
                    maxWidth: 345,
                    background:
                      "   linear-gradient(241deg, rgba(88,255,152,1) 0%, rgba(221,221,221,1) 100%);",
                  }}
                >
                  <CardHeader
                    title="จำนวน Room ทั้งหมด"
                    subheader={"Room"}
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {room}
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={12} md={12}>
              <Item>
              <Deviceshow/>
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={2} md={2}>
 
        </Grid>
        
      </Grid>
    </Box>
  );
}
