import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import axios from "axios";
import { Select } from "@material-ui/core";
const data = {
  id: "root",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
        },
      ],
    },
  ],
};

export default function DeviceTree() {
  const [building, setBuilding] = React.useState([]);
  const [items, setItems] = React.useState("");
  const [count, setCount] = React.useState("");
  const [err, setError] = React.useState(false);

  const handleClose2 = () => {
    setError(false);
    window.location.reload();
  };
  React.useEffect(() => {
    setError(true);
    const items = localStorage.getItem("company_id");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getbuild/${items}`)
      .then((res) => {
        console.log(res.data.data.data.list);
        setBuilding(res.data.data.data.list);
        setCount(res.data.data.data.totalCount);
        setError(false);
      });
  }, []);

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  return (
    <div style={{ paddingTop: 10 }}>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
}
