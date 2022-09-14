import React from "react";
import axios from "axios";
import "./styles.css";
import { Paper, Typography, Button,Box,LinearProgress  } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
const Fileupload = () => {
  const [avatar, setFile] = React.useState(null);
  const [err,setErr] = React.useState(false)
  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(avatar)
  const onSubmit = (e) => {
    setErr(true)
    e.preventDefault();
    const data = new FormData();
    data.append("avatar", avatar);
    const items = localStorage.getItem("company_id");
    const position = localStorage.getItem("position");
    data.append("company_id", items);
    data.append("position", position);
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_API_KEY}/importexcel`, data)
      .then((res) => {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form method="post" action="#" id="#" >
      <div className="form-group files" style={{ width: 500, marginTop: 150 }}>
        <Paper>
        
          <Typography variant="h5">Upload Your File </Typography>
          {err ?  <Box sx={{ display: 'flex' }}><LinearProgress color="secondary" width='100%' /></Box> : <> </>}
          <input
            type="file"
            onChange={onInputChange}
            className="form-control"
            multiple
          />
        
          <Button fullWidth onClick={onSubmit} variant="contained">
            Submit
          </Button>
        </Paper>
      </div>
    </form>
  );
};

export default Fileupload;
