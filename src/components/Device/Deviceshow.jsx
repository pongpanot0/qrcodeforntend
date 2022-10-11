import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import axios from "axios";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import "./Deviceshow.css";
import Box from "@mui/material/Box";
function Deviceshow() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [device, Setdevice] = React.useState([]);
  const [cssdoor, Setcssdor] = React.useState("");
  const [shouldHaveWidthSetting, setshouldHaveWidthSetting] =
    React.useState(false);
  React.useEffect(() => {
    getData();
  }, []);
  const getData = (event) => {
    const items = localStorage.getItem("company_id");

    axios
      .get(`${process.env.REACT_APP_API_KEY}/getdeviceuuid/${items}`)
      .then((res) => {
        console.log(res.data.data.list);
        Setdevice(res.data.data.list);
      });
  };

  const Opendoor = async (id) => {
    const items = localStorage.getItem("company_id");
    await axios
      .post(`${process.env.REACT_APP_API_KEY}/openDevice/${items}/${id}`)
      .then((res) => {
        setshouldHaveWidthSetting(true);
        console.log(res);
        const timer = setTimeout(() => {
          setshouldHaveWidthSetting(false);
        }, 2000);
        return () => clearTimeout(timer);
      });
  };
  const [hover, setHover] = React.useState(true);

  const mouseOver = (event) => {
    setHover(true);
  };
  return (
    <div>
      {" "}
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {device.map((item, index) => {
            const Rong = () => {
              if (item.connectionStatus === 1) {
                return (
                  <ImageListItemBar
                    key={index}
                    title={item.name}
                    className="second"
                    style={
                      shouldHaveWidthSetting
                        ? { border: "2px solid green" }
                        : undefined
                    }
                    subtitle={
                      <Button
                        variant="contained"
                        onClick={() => Opendoor(item.devSn)}
                      >
                        กดเพื่อเปิดประตู
                      </Button>
                    }
                  />
                );
              }
              if (item.connectionStatus === 0) {
                return (
                  <ImageListItemBar
                    key={index}
                    title={item.name}
                    className="first"
                    style={
                      shouldHaveWidthSetting
                        ? { border: "2px solid green", backgroundColor: "red" }
                        : undefined
                    }
                    subtitle={
                      <Button
                       style={{color:'white'}}
                        disabled
                        variant="outlined"
                        onClick={() => Opendoor(item.devSn)}
                      >
                        ประตูของคุณ Offline อยู่
                      </Button>
                    }
                  />
                );
              }
            };

            return (
              <Grid item xs={2}>
                <Item>
                  <ImageListItem key={item.id}>
                    {" "}
                    <img
                      src={
                        shouldHaveWidthSetting
                          ? "https://png.pngtree.com/png-vector/20190227/ourlarge/pngtree-vector-door-icon-png-image_708559.jpg"
                          : "https://static.thenounproject.com/png/74737-200.png"
                      }
                      srcSet={
                        shouldHaveWidthSetting
                          ? "https://static.thenounproject.com/png/74737-200.png"
                          : "https://png.pngtree.com/png-vector/20190227/ourlarge/pngtree-vector-door-icon-png-image_708559.jpg"
                      }
                      alt={item.name}
                      loading="eager"
                    />
                    <Rong />
                  </ImageListItem>
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <ImageList
        sx={{ width: 500, height: 450 }}
        cols={4}
        rowHeight={164}
      ></ImageList>
    </div>
  );
}

export default Deviceshow;
