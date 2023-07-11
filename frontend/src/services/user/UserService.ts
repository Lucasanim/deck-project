import User from "../../models/user/User";
import { GenericClient } from "../genericClient/genericClient";

const instance = new GenericClient("/users");

export const getUserDetails = (userId: number | string) => {
  return instance.get<User>(`/${userId}`);
};

export const searchUsersByUsername = (username: string) => {
  return instance.get<User[]>(`/search-by-username?username=${username}`);
};
