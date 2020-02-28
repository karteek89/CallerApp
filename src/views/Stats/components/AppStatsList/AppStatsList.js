import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AppStatsListItem from "../AppStatsListItem";
import AppListData from "configs/AppListData";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const AppStatsList = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Application Name</TableCell>
            <TableCell align="right">CPU</TableCell>
            <TableCell align="right">Disk Space</TableCell>
            <TableCell align="right">Web Apps</TableCell>
            <TableCell align="right">Adaptor Status</TableCell>
            <TableCell align="right">Middle Ware</TableCell>
            <TableCell align="right">SFTP Status</TableCell>
            <TableCell align="right">Daily Jobs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {AppListData.map((row, key) => (
            <AppStatsListItem key={key} app={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppStatsList;
