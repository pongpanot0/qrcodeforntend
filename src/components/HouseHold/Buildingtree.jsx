import * as React from "react";
import TreeView from "@mui/lab/TreeView";


import axios from "axios";
import "./building.css";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: 'black',
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightRegular,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightBold,
      paddingLeft:theme.spacing(0)
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 50,
    textAlign:'left',
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};
export default function Buildingtree() {
  const [items, setItems] = React.useState("");
  const [building, setBuilding] = React.useState([]);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getDate();
    getcommunity();
  }, []);
  const getDate = () => {
    const items = localStorage.getItem("company_id");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/exportsBuilding2query/${items}`)
      .then((res) => {
        setData(res.data);
      });
  };
  const getcommunity = () => {
    const items = localStorage.getItem("company_id");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getcommunity/${items}`)
      .then((res) => {
        console.log(res.data.data);
        setBuilding(res.data.data);
      });
  };
  const data2 = data.map((row) => {
    return (
      <StyledTreeItem
        nodeId={row.id}
        label={`โซน  ${row.name}`}
        style={{ marginLeft: 10, fontSize: 75 }}
        bgColor="#0000"
        color="#e6f4ea"
        className="header"
      >
        {row.det.map((row) => {
          return (
            <StyledTreeItem
              nodeId={row.id}
              label={`โซนสาขา : ${row.name}`}
              bgColor="#fcefe3"
              style={{ marginLeft: 70, fontSize: 75 }}
            />
          );
        })}
      </StyledTreeItem>
    );
  });
  console.log(data2);

  return (
    <>
      <Box sx={{ width: "100%", paddingTop: 5 }}>
        <TreeView
          aria-label="gmail"
          defaultExpanded={["3"]}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<div style={{ width: 24 }} />}
          style={{ marginLeft: 10, fontSize: 75 }}
        >
          <StyledTreeItem
            nodeId={` ${building.id}`}
            label={`ชื่อตึก : ${building.name}`}
            color="black"
            bgColor="#fcefe3"
          >
            {data2}
          </StyledTreeItem>
        </TreeView>
      </Box>
    </>
  );
}
