import { GET } from "./ApiHelperService";

export default {
  getAll: () => GET("apps/getAll")
};
