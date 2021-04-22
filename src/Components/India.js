import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Statedata from "./Statedata";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function India(props) {
  const [indiaData,setindiaData] = React.useState({});
  const [loader,setloader] = React.useState(true);
  React.useEffect(()=>{
    axios.get("https://corona.lmao.ninja/v2/countries/india").then((response)=>{
      setindiaData(response.data);
      console.log("Getting India Detailes");
      setloader(false);
    })
  },[])
  return (
    <React.Fragment>
      <div className="row">
        <div
          style={{
            justifyContent: "center",
            alignSelf: "center",
            display: "flex",
          }}
          className="col-md-12"
        >
          <img src="https://disease.sh/assets/img/flags/in.png" />
        </div>
        <div className="col-md-12">
          <h3 style={{ textAlign: "center", margin: 0 }}>INDIA</h3>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-md-3">
          <InfoCard bg="primary" color="white" hd="TOTAL CASES" sub={indiaData.cases ? indiaData.cases : "Updating..!"} />
        </div>
        <div className="col-md-3">
          <InfoCard bg="warning" color="white" hd="ACTIVE CASES" sub={indiaData.active ? indiaData.active : "Updating..!"} />
        </div>
        <div className="col-md-3">
          <InfoCard bg="success" color="white" hd="RECOVERY" sub={indiaData.recovered ? indiaData.recovered : "Updating..!"} />
        </div>
        <div className="col-md-3">
          <InfoCard bg="danger" color="white" hd="DEATHS" sub={indiaData.deaths ? indiaData.deaths : "Updating..!"} />
        </div>
      </div>
      <div className="col-md-12 mb-5">
          <Statedata />
      </div>
    </React.Fragment>
  );
}

function InfoCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Card
      className={[classes.root, `bg-${props.bg}`, `text-${props.color}`]}
      variant="outlined"
    >
      <CardContent>
        <h4 style={{ textAlign: "center" }}> {props.hd} </h4>
        <h5 style={{ textAlign: "center" }}> {props.sub} </h5>
        {/* <p style={{ textAlign: "center" }}>[ Today : {props.p} ] </p> */}
      </CardContent>
      {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
    </Card>
  );
}

export default India;
