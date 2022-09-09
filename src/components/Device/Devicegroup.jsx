import { Transfer } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./Device.css";
import axios from "axios";
import { Button, TextField,Typography } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";

const Devicegroup = () => {
  const navigate = useNavigate()
  const [device, setDevice] = React.useState([]);
  const mockData = device.map((row, i) => (
    {
    key: row.devSn,
    title: `${row.name}`,
    description: `${row.name}`,
  }));
  const initialTargetKeys = mockData
    .filter((item) => Number(item.key))
    .map((item) => item.key);
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [person, setPerson] = useState([]);
  const [items, setItems] = React.useState("");
  const mockData2 = person.map((row, i) => ({
    key: row.user_id,
    title: `${row.first_name}`,
    description: `${row.first_name}`,
  }));
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
 
  ///userTargetKey
  const initialTargetKeys2 = mockData
    .filter((item) => Number(item.key))
    .map((item) => item.key);
  const [targetKeys2, setTargetKeys2] = useState(initialTargetKeys2);
  const [selectedKeys2, setSelectedKeys2] = useState([]);
  const [groupname, setGroupname] = useState("");
  React.useEffect(() => {
    getData();
    getperson();
  }, []);
  const postdata = () => {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/creategroupdevice/${items}`, {
        targetKeys: targetKeys,
        targetKeys2: targetKeys2,
        groupname: groupname,
      })
      .then((res) => {
        alert('Success')
        navigate('/dashboard/DeviceDisplay')
      });
  };
  const getData = (event) => {
    const items = localStorage.getItem("company_id");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getdeviceuuid/${items}`)
      .then((res) => {
        setDevice(res.data.data.list);
      });
  };
  const getperson = (event) => {
    const items = localStorage.getItem("company_id");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getperson/${items}`)
      .then((res) => {
        setPerson(res.data.data);
      });
  };
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction, e) => {};
  const onChange2 = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys2(nextTargetKeys);
  };

  const onSelectChange2 = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys2([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll2 = (direction, e) => {};
  return (
    <div>
        
      <Box sx={{ ...style, width: 800, color: "black" }}>
   
        <InputLabel htmlFor="Namegroup">กำหนดสิทธิ์เข้าถึง</InputLabel>
        <br></br>
        <TextField
          width="100%"
          type="text"
          id="Namegroup"
          fullWidth
          name="Namegroup"
          placeholder="ใส่ชื่อกลุ่ม"
          onChange={(e) => {
            setGroupname(e.target.value);
          }}
        ></TextField>
      
        <Transfer
          style={{ width: "100%" }}
          listStyle={{
            width: "100%",
            color: "black",
            opacity: "100%",
            fontWeight: "bold",
          }}
          dataSource={mockData2}
          titles={["ชื่อสมาชิก", "สมาชิกที่เลือก"]}
          targetKeys={targetKeys2}
          selectedKeys={selectedKeys2}
          onChange={onChange2}
          onSelectChange={onSelectChange2}
          onScroll={onScroll2}
          render={(item) => item.title}
        />
          <Transfer
          listStyle={{
            width: "100%",
            color: "black",
            opacity: "100%",
            fontWeight: "bold",
          }}
          style={{ width: "100%", color: "black" }}
          dataSource={mockData}
          titles={["ชื่อประตู", "ประตูที่เลือก"]}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          onScroll={onScroll}
          render={(item) => item.title}
        />
        <br></br>
        <Button variant="contained" onClick={postdata} fullWidth>
          Add
        </Button>
      </Box>
    </div>
  );
};

export default Devicegroup;
