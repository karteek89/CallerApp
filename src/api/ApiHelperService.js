import { Messages } from "utils";
import axios from "axios";

const _baseUrl = "https://localhost:44364/api";

axios.interceptors.response.use(
  response => {
    const data = response.data;
    // Check if data is not found then show toast.
    if (!data || Object.keys(data).length < 1 || data.length < 1) {
      console.log(Messages.NO_DATA_FOUND);
    }

    if (response.headers.hasOwnProperty("content-disposition")) {
      return response;
    }

    return data;
  },
  function(error) {
    let errResponse = error.response;
    if (!errResponse) {
      errResponse = { data: { message: Messages.SOMETHING_WENT_WRONG } };
    } else {
      if (errResponse.status === 400) {
      } else if (errResponse.status === 404) {
        console.log(Messages.NO_DATA_FOUND);
      } else if (errResponse.status === 401) {
        console.log(Messages.UN_AUTHORIZED);
      } else if (errResponse.status >= 500) {
        console.log(Messages.SOMETHING_WENT_WRONG);
      }
    }

    return Promise.reject(errResponse);
  }
);

export const GET = url => {
  return axios.get(`${_baseUrl}/${url}`);
};

export const POST = (url, data) => {
  return axios.post(`${_baseUrl}/${url}`, data);
};

export const GET_BY_APP = (app, url) => {
  return axios.get(`${app.apiUrl}/${url}`);
};

export const POST_BY_APP = (app, url, data) => {
  return axios.post(`${app.apiUrl}/${url}`, data);
};
