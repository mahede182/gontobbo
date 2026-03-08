/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { MAX_RESPONSE_TIME } from "../constants/config";
import { BASE_URL } from "@/constants/urls";
import axios from "axios";

const config = {
  method: "get",
  url: `${BASE_URL}/api/users/5`,
};

export const getUser = async () => {
  const response = await axios(config);
  return response;
};
