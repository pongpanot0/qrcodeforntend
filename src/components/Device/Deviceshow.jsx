import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
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
        console.log(res.data.data.list, "111");
        Setdevice(res.data.data.list);
      });
  };
  return (
    <div>
      {" "}
      <ImageList variant="masonry"   cols={3} gap={8}>
        {device.map((item) => (
          <ImageListItem key={item.img} width='500px'>
            <img
              src={`https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2016/04/1-Ecobee3-1-e1459745888815.jpg?w=248&fit=crop&auto=format`}
              srcSet={`https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2016/04/1-Ecobee3-1-e1459745888815.jpg?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
              width='50%'
              height='100px'
            />
            <ImageListItemBar
              title={item.name}
              subtitle={<Button>กดเพื่อเปิดประตู</Button>}
              
              
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default Deviceshow;