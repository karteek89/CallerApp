import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { LogsTable, LogsToolbar } from "./components";
import { LogService } from "api";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = ({ match }) => {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const { logLevel, date, logCount } = match.params;

  useEffect(() => {
    const loadLogs = async () => {
      const data = await LogService.getLogsBy(date, logLevel, 1, 10);
      setList(data);
    };

    loadLogs();
  }, [date, logLevel]);

  return (
    <div className={classes.root}>
      <LogsToolbar />
      <div className={classes.content}>
        <LogsTable list={list} totalCount={parseInt(logCount)} />
      </div>
    </div>
  );
};

export default UserList;
