import { SYSTEM_CONSTANTS } from "../constants/constants";
const BASE_URL = `${SYSTEM_CONSTANTS.BASE_URL}/api/v1`;
export const URLS = {
  REGISTER: BASE_URL + "/register",
  LOGIN: BASE_URL + "/login",
  LOGOUT: BASE_URL + "/logout",
  TASK_LIST: BASE_URL + "/tasks",
  TASK: BASE_URL + "/tasks/:taskId",
  TASK_CREATE: BASE_URL + "/tasks", //POST
  TASK_UPDATE: BASE_URL + "/tasks/:taskId", //PUT
  TASK_DELETE: BASE_URL + "/tasks/:taskId", //DELETE
  TASK_ITEMS: BASE_URL + "/subtaskGet/:mainTaskId", //GET
  SUB_TASK: BASE_URL + "/subtasks/:subtaskId", //GET
  SUB_TASK_CREATE: BASE_URL + "/subtasks", //POST
  SUB_TASK_UPDATE: BASE_URL + "/subtasks/:subtaskId", //PUT
  SUB_TASK_DELETE: BASE_URL + "/subtasks/:subtaskId", //DELETE

  // SANCTUM_TOKEN: "/sanctum/csrf-cookie",
};
