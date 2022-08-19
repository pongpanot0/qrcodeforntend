import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import axios from "axios";

export default function RoomTree() {
  const [room, setRoom] = React.useState([]);
  const [items, setItems] = React.useState("");
  const [count, setCount] = React.useState("");
  const [err, setError] = React.useState(false);


  React.useEffect(() => {
    setError(true);
    const items = localStorage.getItem("company_id");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getbuild/${items}`)
      .then((res) => {
        setRoom(res.data.data.data.list);
        setCount(res.data.data.totalCount);
        setError(false);
      });
  }, []);
  const data2 = room.map((row) => {

    const id = row.id;
    const name = row.name;
  });
  const data = {
    id: "id",
    name: "ชื่อตึก",
    children: [
      {
        id: data2.id,
        name: data2.name,
      },
    ],
  };

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
