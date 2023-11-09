import axios from "axios";

import { API_URL } from "../config/index";

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
