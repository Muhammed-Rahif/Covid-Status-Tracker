import React from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loader from "./Loader";

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function World() {
  const classes = useStyles();
  const [worldData, setworldData] = React.useState([]);
  const [loader, setloader] = React.useState(true);
  React.useEffect(() => {
    axios.get("https://corona.lmao.ninja/v2/countries").then((response) => {
      setworldData(response.data);
      console.log("Getting All Countries..!");
      setloader(false)
    });
  }, []);

  if (loader) {
    return (
      <div className="row p-5">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="col-md-12"
        >
          <Loader />
        </div>
        <div className="col-md-12">
          <p style={{ textAlign: "center",margin:"10px" }}>
            Fetching data, Please wait a bit...!
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <TableContainer className="mt-5 mb-5" component={Paper}>
        <Table stickyHeader={true} className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell align="right">Active</StyledTableCell>
              <StyledTableCell align="right">Cases</StyledTableCell>
              <StyledTableCell align="right">Recovered</StyledTableCell>
              <StyledTableCell align="right">Deaths</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {worldData.map((itm) => (
              <StyledTableRow
                className="bg-primary text-white"
                key={itm.country}
              >
                <StyledTableCell
                  className="text-white"
                  component="th"
                  scope="row"
                >
                  {itm.country}
                  <img
                    src={itm.countryInfo.flag}
                    style={{
                      width: "2em",
                      height: "auto",
                      marginLeft: "1.2em",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell className="text-white" align="right">
                  {itm.active}
                </StyledTableCell>
                <StyledTableCell className="text-white" align="right">
                  {itm.cases}
                </StyledTableCell>
                <StyledTableCell className="text-white" align="right">
                  {itm.recovered}
                </StyledTableCell>
                <StyledTableCell className="text-white" align="right">
                  {itm.deaths}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
