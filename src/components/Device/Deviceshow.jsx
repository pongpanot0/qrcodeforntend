import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import axios from "axios";


import { Button } from "@mui/material";
function Deviceshow() {
  const [device, Setdevice] = React.useState([]);

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
        console.log(res);
      })

  };
  return (
    <div>
      {" "}
      <ImageList variant="masonry" cols={3} gap={8}>
        {device.map((item) => (
          <ImageListItem key={item.img} width="500px">
            <img
              src={`https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2016/04/1-Ecobee3-1-e1459745888815.jpg?w=248&fit=crop&auto=format`}
              srcSet={`https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2016/04/1-Ecobee3-1-e1459745888815.jpg?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
              width="50%"
              height="100px"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={
                <Button onClick={() => Opendoor(item.devSn)}>
                  กดเพื่อเปิดประตู
                </Button>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default Deviceshow;
