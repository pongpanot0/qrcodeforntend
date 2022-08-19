import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./qrcode.css";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function QrcodeShow() {
  const printRef = React.useRef();
  const [visitor, setVisitor] = React.useState([]);
  const { id } = useParams();
  React.useEffect(() => {
    getData();
  }, [id]);
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_KEY}/getVisitorId/${id}`)
      .then((res) => {
        console.log(res.data.data[0]);
        setVisitor(res.data.data[0]);
      });
  };

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/jpeg");

    const pdf = new jsPDF();
    pdf.addImage(data, "JPEG", 0, 0);
    pdf.autoPrint();
    window.open(pdf.output("bloburl"));
    /*  window.open(pdf) */
    // Save document
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={0} sm={2} md={2}></Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Item>
            <Button onClick={handleDownloadImage}>Print</Button>
            <Card sx={{ width: "210mm", height: "auto" }} ref={printRef}>
              <CardHeader
                fullwidth
                titleTypographyProps={{ variant: "h3" }}
                title="Qrcode"
                subheader={`ตั้งแต่${visitor.start} ถึง ${visitor.end}`}
              />
              <CardMedia
                component="img"
                height="auto"
                src={`data:image/jpeg;base64,${visitor.qrcode}`}
                fullwidth
                alt={visitor.visitor_name}
              />
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                  <strong>คุณ</strong> {visitor.visitor_name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <strong>รหัสสำหรับการเปิดประตู</strong> {visitor.tempPwd}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <strong>ใช้ได้</strong> {visitor.usableCount} ครั้ง
                </Typography>
              </CardContent>
            </Card>
          </Item>
        </Grid>
        <Grid item xs={0} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
}
