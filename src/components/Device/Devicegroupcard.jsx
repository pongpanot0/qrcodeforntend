import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Devicegroupcard() {
  React.useEffect(() => {
    getData();
  }, []);
  const [items, setItems] = React.useState("");
  const [groupdata, setGroupdata] = React.useState([]);
  console.log(groupdata);
  const getData = () => {
    const items = localStorage.getItem("company_id");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getdevicegroup/${items}`)
      .then((res) => {
        setGroupdata(res.data.data);
      });
  };

  return (
    <>
      <Button component={Link} to="/dashboard/Devicegroup" variant="contained">
        AddGroup
      </Button>
      <List
        sx={{
          width: "100%",

          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {groupdata.map((sectionId) => (
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`ชื่อกลุ่ม ${sectionId.devicegroup_name}`}
                secondary={`วันที่สร้าง ${sectionId.created_at} `}
              />
              <Button variant="contained" component={Link} to={"/dashboard/DevicegroupEdit/"+sectionId.devicegroup_uuid}>Edit </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))}
      </List>
    </>
  );
}
