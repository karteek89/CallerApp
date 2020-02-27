import { GET } from "./ApiHelperService";

export default {
  getAll: () => GET("logs/getAll"),
  getLogsBy: (logDate, logLevel, page, limit) => {
    let url = `logs/getLogsBy?logDate=${logDate}&limit=${limit}&page=${page}`;
    if (!!logLevel && logLevel !== "all") url += `&logLevel=${logLevel}`;

    return GET(url);
  }
};
