import { GET } from "./ApiHelperService";

export default {
  getSftpStatus: appId => GET("status/getSftpStatus"),
  getAdaptorStatus: appId => GET("status/getAdaptorStatus")
};
