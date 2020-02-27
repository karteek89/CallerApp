import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

import { StatusBullet } from "components";
import { LogService } from "api";
import { AppContext } from "context";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: "flex",
    alignItems: "center"
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

const DayWiseLogList = props => {
  const { className, ...rest } = props;
  const [logs, setLogs] = useState([]);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [appId] = useContext(AppContext);

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      const data = await LogService.getAll();
      setLoading(false);
      setLogs(data);
    };
    loadLogs();
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="All Logs" />
      <Divider />
      {loading && <CircularProgress />}

      {!loading && (
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>LogDate</TableCell>
                    <TableCell>All</TableCell>
                    <TableCell>Errors</TableCell>
                    <TableCell>Warnings</TableCell>
                    <TableCell>Informations</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logs.map((log, key) => (
                    <TableRow hover key={key}>
                      <TableCell>
                        <RouterLink
                          to={`/logs/${appId}/${
                            log.logDate
                          }/all/${log.errorCount +
                            log.warningCount +
                            log.infoCount}`}
                        >
                          {log.logDate}
                        </RouterLink>
                      </TableCell>
                      <TableCell>
                        <div className={classes.statusContainer}>
                          <RouterLink
                            to={`/logs/${appId}/${
                              log.logDate
                            }/all/${log.errorCount +
                              log.warningCount +
                              log.infoCount}`}
                          >
                            <StatusBullet
                              className={classes.status}
                              color="info"
                              size="sm"
                            />
                            {log.errorCount + log.warningCount + log.infoCount}
                          </RouterLink>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={classes.statusContainer}>
                          <RouterLink
                            to={`/logs/${appId}/${log.logDate}/error/${log.errorCount}`}
                          >
                            <StatusBullet
                              className={classes.status}
                              color="danger"
                              size="sm"
                            />
                            {log.errorCount}
                          </RouterLink>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={classes.statusContainer}>
                          <RouterLink
                            to={`/logs/${appId}/${log.logDate}/warn/${log.warningCount}`}
                          >
                            <StatusBullet
                              className={classes.status}
                              color="warning"
                              size="sm"
                            />
                            {log.warningCount}
                          </RouterLink>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={classes.statusContainer}>
                          <RouterLink
                            to={`/logs/${appId}/${log.logDate}/info/${log.infoCount}`}
                          >
                            <StatusBullet
                              className={classes.status}
                              color="info"
                              size="sm"
                            />
                            {log.infoCount}
                          </RouterLink>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      )}
    </Card>
  );
};

DayWiseLogList.propTypes = {
  className: PropTypes.string
};

export default DayWiseLogList;
