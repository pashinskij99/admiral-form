import axios from "axios";
import {baseDataBaseUrl} from "./baseDataBaseUrl";

export const instanceAxios = axios.create({
  baseURL: baseDataBaseUrl
});
