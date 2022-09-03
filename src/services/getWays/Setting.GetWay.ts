import Axios from "axios";
import { getTokenLocal, setTokenLocal } from "../../utils/Common";

const HttpService = Axios.create({
  baseURL: "http://127.0.0.1:2000",
  timeout: 30000,
  withCredentials: true,
  headers: {
    Authorization: "Bearer " + getTokenLocal(),
  },
});

export const SetToken = (token: string) => {
  HttpService.defaults.headers.common["Authorization"] = "Bearer " + token;
  setTokenLocal(token);
};
export default HttpService;
