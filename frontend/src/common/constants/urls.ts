import { SYSTEM_CONSTANTS } from "../constants/constants";
const BASE_URL = SYSTEM_CONSTANTS.BASE_URL;
export const URLS = {
  REGISTER: BASE_URL + "/api/register",
  LOGIN: BASE_URL + "/api/login",
  SANCTUM_TOKEN: "/sanctum/csrf-cookie",
};
