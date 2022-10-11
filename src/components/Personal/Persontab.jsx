import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import Devicegroupcard from "../Device/Devicegroupcard";
import Personal from "./Personal";
import Departmenttable from "../Department/Departmenttable";
import Department from "../Department/Department";
import Timeprofile from "./Timeprofile";
import Timeprofiletable from "./Timeprofiletable";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Persontab() {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem("device");
    return stickyValue !== null ? JSON.parse(stickyValue) : 0;
  });
  const handleChange = (event, newValue) => {
    localStorage.setItem("device", newValue);
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={0} sm={2} md={2}></Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Item>
            {" "}
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
              <Tabs
                value={value}
                defaultActiveKey={localStorage.getItem("keys")}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
                textColor="inherit"
                indicatorColor="secondary"
              >
                <Tab label="บุคคล" {...a11yProps(0)} />
                <Tab label="แผนก" {...a11yProps(1)} />
                <Tab label="กำหนดสิทธิ์เข้าถึง" {...a11yProps(2)} />
                <Tab label="TimeProfile" {...a11yProps(3)} />
              </Tabs>
              <TabPanel fullwidth value={value} index={0}>
                <Personal />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Devicegroupcard />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Department />
              </TabPanel>
              <TabPanel fullwidth value={value} index={3}>
                <Timeprofiletable />
              </TabPanel>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={0} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
}
