import React from "react";
import axios from "axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  table: {
    minWidth: 700,
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Statedata(props) {
  const [stateData, setstateData] = React.useState({});
  const [loader, setloader] = React.useState(true);
  const classes = useStyles();
  React.useEffect(() => {
    axios
      .get("https://api.covid19india.org/state_district_wise.json")
      .then((response) => {
        setstateData(response.data);
        console.log("Getting State details");
        setloader(false);
      })
      .catch((err) => {
        alert(`Can't get data : ${err}`);
      });
  }, []);

  var stateNames = Object.keys(stateData);

  if (loader) {
    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center">States in India</h3>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}} className="col-md-12">
          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center">States in India</h3>
        </div>
        <div className="col-md-12">
          <div className={classes.root}>
            {stateNames.map((itm, key) => {
              var districtData = stateData[itm].districtData;
              var districtsNames = Object.keys(districtData);

              var district_active = 0;
              var district_confirmed = 0;
              var district_deceased = 0;
              var district_recovered = 0;
              var district_list = [];
              districtsNames.forEach((element) => {
                district_active =
                  +district_active + districtData[element].active;
                district_confirmed =
                  +district_confirmed + districtData[element].confirmed;
                district_deceased =
                  +district_deceased + districtData[element].deceased;
                district_recovered =
                  +district_recovered + districtData[element].recovered;
                districtData[element].district_name = element;
                district_list.push(districtData[element]);
              });
              console.log(district_list);
              return (
                <Accordion className="bg-primary text-white">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon htmlColor="white" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      <b> {itm} </b>{" "}
                      <span style={{ opacity: 0.75 }} className="bg-primary">
                        - Total Cases - {district_confirmed} - Active -{" "}
                        {district_active} - Recovered - {district_recovered} -
                        Deaths - {district_deceased}
                      </span>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>District</StyledTableCell>
                            <StyledTableCell align="right">
                              Confirmed ({district_confirmed})
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Active ({district_active})
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Recovered ({district_recovered})
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Deaths ({district_deceased})
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {district_list.map((itm) => (
                            <StyledTableRow key={itm.district_name}>
                              <StyledTableCell component="th" scope="row">
                                {itm.district_name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {itm.confirmed}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {itm.active}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {itm.recovered}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {itm.deceased}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Statedata;
