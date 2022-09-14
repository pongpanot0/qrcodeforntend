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
  const [totalSum, setTotalSum] = React.useState(0);
  React.useEffect(() => {
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getVisitorlenght/${items}`)
      .then((res) => {
        SetdeviceLengnt(res.data.count);
      });
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getRoom/${items}`)
      .then((res) => {
        setRoom(res.data.data.totalCount);
      });
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getperson/${items}`)
      .then((res) => {
        console.log(res.data);
        setPerson(res.data.data.length);
      });

    axios
      .get(`${process.env.REACT_APP_API_KEY}/getdeviceuuid/${items}`)
      .then((res) => {
        console.log(res.data.data.list, "111");
        setBuildingUnit(res.data.data.list);
        const total = res.data.data.list.reduce(
          (acc, row) => acc + row.connectionStatus,
          0
        );
        setTotalSum(total);
      });
  }, []);

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
              <>
                {" "}
                <Card
                  sx={{
                    maxWidth: 345,
                    textAlign: "center",
                    background:
                      " linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%);",
                    boxShadow: "0px 10px 20px 0px #F9D59B",
                  }}
                >
                  <CardHeader
                    title="จำนวนสมาชิกทั้งหมด"
                    subheader={"สมาชิก"}
                    variant="h6"
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        E
                      </Avatar>
                    }
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {person}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            </Grid>
            <Grid item xs={12} md={3}>
              <>
                {" "}
                <Card
                  sx={{
                    maxWidth: 345,
                    background:
                      " linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
                    boxShadow: "0px 10px 20px 0px #c484f3",
                    textAlign: "center",
                  }}
                >
                  <CardHeader
                    title="จำนวน ผู้มาติดต่อในพื้นที่ ทั้งหมด"
                    subheader={"ผู้มาติดต่อในพื้นที่"}
                    avatar={
                      <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        D
                      </Avatar>
                    }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {deviceLenght}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            </Grid>
            <Grid item xs={12} md={3}>
              <>
                {" "}
                <Card
                  sx={{
                    maxWidth: 345,
                    textAlign: "center",
                    background:
                      " linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
                    boxShadow: "0px 10px 20px 0px #FC929D",
                  }}
                >
                  <CardHeader
                    title="จำนวน ประตู ทั้งหมด"
                    subheader={"โซนสาขา"}
                    style={{ fontSize: 50 }}
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        B
                      </Avatar>
                    }
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {room}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            </Grid>
            <Grid item xs={12} md={3}>
              <>
                {" "}
                <Card
                  sx={{
                    maxWidth: 345,
                    textAlign: "center",
                    backGround:
                      "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
                    boxShadow: "0px 10px 20px 0px black",
                  }}
                >
                  <CardHeader
                    title="จำนวน ประตูออนไลน์ ทั้งหมด"
                    subheader={"ประตูออนไลน์"}
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {totalSum}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            </Grid>
            <Grid item xs={12} md={12}>
              <Item>
                <Deviceshow />
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
}
