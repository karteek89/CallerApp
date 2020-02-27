import React, { useState, useEffect } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import { StatusService } from "api";

const AppStatsListItem = ({ app }) => {
  const [adaptorStatusList, setAdaptorStatusList] = useState([]);
  const [isSftpSuccess, setSftpSuccess] = useState(false);
  const [isSftpLoading, setSftpLoading] = useState(false);
  const [isAdaptorLoading, setAdaptorLoading] = useState(false);

  useEffect(() => {
    const loadAdaptorStatus = async () => {
      setAdaptorLoading(true);
      var res = await StatusService.getAdaptorStatus(1);
      setAdaptorLoading(false);
      setAdaptorStatusList(res);
    };

    const loadSFTPStatus = async () => {
      setSftpLoading(true);
      var res = await StatusService.getSftpStatus(1);
      setSftpLoading(false);
      setSftpSuccess(res);
    };

    loadAdaptorStatus();
    loadSFTPStatus();
  }, []);

  return (
    <TableRow key={app.name}>
      <TableCell component="th" scope="row">
        {app.name}
      </TableCell>
      <TableCell align="right">-</TableCell>
      <TableCell align="right">-</TableCell>
      <TableCell align="right">-</TableCell>
      <TableCell align="right">
        {isAdaptorLoading && (
          <CircularProgress
            variant="indeterminate"
            disableShrink
            size={19}
            thickness={4}
          />
        )}

        {!isAdaptorLoading &&
          adaptorStatusList.map((adaptor, key) => {
            return adaptor.isRunning ? (
              <Checkbox
                title={`${adaptor.processName} running.`}
                color="primary"
                size="small"
                checked
                key={key}
              />
            ) : (
              <Checkbox
                key={key}
                title={`${adaptor.processName} not running.`}
                color="default"
                size="small"
                checked
              />
            );
          })}
      </TableCell>
      <TableCell align="right">-</TableCell>
      <TableCell align="right">
        {isSftpLoading && (
          <CircularProgress
            variant="indeterminate"
            disableShrink
            size={19}
            thickness={4}
          />
        )}
        {!isSftpLoading &&
          (isSftpSuccess ? (
            <Checkbox color="primary" size="small" checked />
          ) : (
            <Checkbox disabled size="small" checked />
          ))}
      </TableCell>
      <TableCell align="right">-</TableCell>
    </TableRow>
  );
};

export default AppStatsListItem;
