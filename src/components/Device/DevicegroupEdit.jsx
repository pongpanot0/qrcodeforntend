import { Transfer, Typography } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./Device.css";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate, useParams } from "react-router-dom";
const DevicegroupEdit = () => {
  const navigate = useNavigate();
  const [device, setDevice] = React.useState([]);
  const mockData = device.map((row, i) => ({
    key: row.devSn,
    title: `${row.name}`,
    description: `${row.name}`,
  }));
  const [targetKeys, setTargetKeys] = useState([]);
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
  const [uuid, setUUid] = useState([]);
  const [groupuuidname, setGroupuuidname] = useState("");
  const getbyuuid = async () => {
    const items = localStorage.getItem("company_id");
    if (items) {
      setItems(items);
    }
    await axios
      .get(`${process.env.REACT_APP_API_KEY}/getdevicegroupcompanyid/${id}`)
      .then((res) => {
        setUUid(res.data.data);
        setGroupuuidname(res.data.data[0].groupuser_name);
        setTargetKeys(res.data.device.map((row) => row.devicegroup_device));
        setTargetKeys2(res.data.data.map((row) => row.groupuser_userid));
      });
  };
  ///userTargetKey

  const [targetKeys2, setTargetKeys2] = useState([]);
  const [selectedKeys2, setSelectedKeys2] = useState([]);
  const [groupname, setGroupname] = useState("");
  React.useEffect(() => {
    getbyuuid();
    getData();
    getperson();
  }, []);
  const { id } = useParams();
  const postdata = () => {
    console.log("1");
    const items = localStorage.getItem("company_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/addpermision`, {
        id: id,
        company_id: items,
        targetKeys: targetKeys,
        targetKeys2: targetKeys2,
        groupname: groupuuidname,
        created_by: 1,
      })
      .then((res) => {
        console.log(res);
        alert("Success");
        navigate("/dashboard/DeviceDisplay");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = () => {
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

  const getperson = () => {
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
    if (direction === "left") {
      if (window.confirm("คุณต้องการลบจริงหรือไม่")) {
        const items = localStorage.getItem("company_id");
        if (items) {
          setItems(items);
        }
        axios
          .post(`${process.env.REACT_APP_API_KEY}/deletepermisiion/${id}`, {
            moveKeys: moveKeys,
          })
          .then((res) => {
            console.log(res);
          });
      } else {
        getbyuuid();
      }
    }

    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction, e) => {};

  const onChange2 = (nextTargetKeys, direction, moveKeys) => {
    if (direction === "left") {
    if (window.confirm("คุณต้องการลบจริงหรือไม่")) {
      const items = localStorage.getItem("company_id");
      if (items) {
        setItems(items);
      }
      axios
        .post(`${process.env.REACT_APP_API_KEY}/deletepermisiionuser/${id}`, {
          moveKeys: moveKeys,
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      getbyuuid();
    }
  }
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
          value={groupuuidname}
          onChange={(e) => {
            setGroupuuidname(e.target.value);
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

export default DevicegroupEdit;
