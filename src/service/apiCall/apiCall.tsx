import axios from "axios";
import { USER_LIST_API } from "../apiEndPoint/apiEndPoint";

export const getUserList = async (count: number) => {
  console.log("API URL: ", `${USER_LIST_API}${count}`);
  const responce = await axios.get(`${USER_LIST_API}${count}`);
  return responce;
};
