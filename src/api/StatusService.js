import { POST_BY_APP } from "./ApiHelperService";

export default {
  getSftpStatus: app => {
    const setting = require(`../configs/App_${app.appId}.json`);
    return POST_BY_APP(app, "status/getSftpStatus", setting.Sftp);
  },
  getAdaptorStatus: app => {
    const setting = require(`../configs/App_${app.appId}.json`);
    return POST_BY_APP(app, "status/getAdaptorStatus", {
      list: setting.AdaptorList
    });
  }
};
