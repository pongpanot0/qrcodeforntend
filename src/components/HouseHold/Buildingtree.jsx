import * as React from "react";
import TreeView from "@mui/lab/TreeView";

import axios from "axios";
import "./building.css";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import { Menu, MenuItem, Button } from "@mui/material";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography, { typographyClasses } from "@mui/material/Typography";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: "black",
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightRegular,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightBold,
      paddingLeft: theme.spacing(0),
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
    textAlign: "left",
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
const useTreeItemStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      "&:hover > $content": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:focus > $content, &$selected > $content": {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: "var(--tree-view-color)",
      },
      "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
        {
          backgroundColor: "transparent",
        },
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      "$expanded > &": {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      "& $content": {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: "inherit",
      color: "inherit",
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0),
      fontSize: 25,
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1,
      fontSize: 15,
      float: "left",
      textAlign: "left",
      color:'black'
    },
    labelHeaderText: {
      fontWeight: "inherit",
      flexGrow: 1,
      fontSize: 20,
      float: "left",
      textAlign: "left",
      color:'black'
    },
    labelHeaderText2: {
      fontWeight: "bold",
      flexGrow: 1,
      fontSize: 25,
      float: "left",
      textAlign: "left",
      color:'black'
    },
  })
);
export default function Buildingtree(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    setSelectedNodeId,
    nodeId,
    ...other
  } = props;
  const [items, setItems] = React.useState("");
  const [building, setBuilding] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const Delete = (id) => {
    const items = localStorage.getItem("company_id");
    axios
      .delete(`${process.env.REACT_APP_API_KEY}/deletebuilding/${items}/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.data.code === 0) {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const DeleteRoom = (id) => {
    console.log("1234");

    const items = localStorage.getItem("company_id");
    axios
      .delete(`${process.env.REACT_APP_API_KEY}/deleteroom/${items}/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 0) {
          getDate();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

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
      <TreeItem
        nodeId={row.id}
        label={
          <div className={classes.labelRoot}>
            <Typography className={classes.labelHeaderText}>
              โซน {row.name}
            </Typography>{" "}
            <Button
              onClick={() => {
                Delete(row.uuid);
              }}
              variant="contained"
             style={{backgroundColor:'#b2102f'}}
            >
              ลบโซน
            </Button>
          </div>
        }
        style={{ marginLeft: 10, fontSize: 75 }}
        bgColor="#0000"
        color="#e6f4ea"
        className="header"
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        multiSelect={true}
      >
        {row.det.map((row) => {
          return (
            <TreeItem
              nodeId={row.id}
              label={
                <div className={classes.labelRoot}>
                  <Typography className={classes.labelText}>
                    โซนสาขา : {row.name}
                  </Typography>{" "}
                  <Button
                   style={{color:'#b2102f'}}
                    onClick={() => {
                      DeleteRoom(row.uuid);
                    }}
                  >
                    ลบโซนสาขา
                  </Button>
                </div>
              }
              bgColor="#fcefe3"
              style={{ marginLeft: 70, fontSize: 75 }}
            />
          );
        })}
      </TreeItem>
    );
  });

  return (
    <>
      <Box sx={{ width: "100%", paddingTop: 5 }}>
        <TreeView
          aria-label="gmail"
          defaultExpanded={["3"]}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<div style={{ width: 24 }}></div>}
          style={{ marginLeft: 10, fontSize: 75 }}
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          multiSelect={true}
        >
          <TreeItem
            nodeId={` ${building.id}`}
            label={
              <div className={classes.labelRoot}>
                <Typography className={classes.labelHeaderText2}>
                  ชื่อตึก : {building.name}
                </Typography>{" "}
                <></>
              
              </div>
            }
            color="black"
            bgColor="#fcefe3"
          >
            {data2}
          </TreeItem>
        </TreeView>
      </Box>
    </>
  );
}
