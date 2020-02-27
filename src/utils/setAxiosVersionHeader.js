import axios from "axios";

export default (version) => {
    axios.interceptors.request.use(function (config) {
        config.headers['X-Version'] = version;
        return config;
    });
};
