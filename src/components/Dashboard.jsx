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
export default function Dashboard() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
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
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title="จำนวนสมาชิกทั้งหมด"
                    subheader={"Employees"}
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        E
                      </Avatar>
                    }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://static.vecteezy.com/system/resources/previews/001/982/126/non_2x/friendship-day-celebration-with-young-people-characters-vector.jpg"
                    alt="Paella dish"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="overline" component="div">
                      2000 คน
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={12} md={3}>
              <Item>
                {" "}
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title="จำนวน Device ทั้งหมด"
                    subheader={"Device"}
                    avatar={
                      <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        D
                      </Avatar>
                    }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://static.vecteezy.com/system/resources/previews/001/982/126/non_2x/friendship-day-celebration-with-young-people-characters-vector.jpg"
                    alt="Paella dish"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="overline" component="div">
                      100 ชิ้น
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={12} md={3}>
              <Item>
                {" "}
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title="จำนวน Building ทั้งหมด"
                    subheader={"Building"}
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        B
                      </Avatar>
                    }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://static.vecteezy.com/system/resources/previews/001/982/126/non_2x/friendship-day-celebration-with-young-people-characters-vector.jpg"
                    alt="Paella dish"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="overline" component="div">
                      2
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={12} md={3}>
              <Item>
                {" "}
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title="จำนวน Room ทั้งหมด"
                    subheader={"Room"}
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://static.vecteezy.com/system/resources/previews/001/982/126/non_2x/friendship-day-celebration-with-young-people-characters-vector.jpg"
                    alt="Paella dish"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="overline" component="div">
                      200
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
            <Grid item xs={12} md={12}>
              <Item>
                <Chart />
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
}
