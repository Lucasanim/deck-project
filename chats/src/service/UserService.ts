import { AxiosError } from "axios";
import AxiosInstance from "../utils/axios/AxiosInstance";
import { logger } from "../utils/logger/Logger";
import User from "../models/User";
import UnauthorizedException from "../Exceptions/UnauthorizedException";

class UserService {
  private static instance = AxiosInstance("/users");

  static async getUsersInformation(
    ids: Array<number | string | undefined>,
    authToken: string
  ): Promise<User[]> {
    try {
      logger.info("Users token: " + authToken);
      const response = await this.instance.post<User[]>("/users-by-id", ids, {
        headers: { Authorization: "Bearer " + authToken },
      });
      logger.info("Users response: " + response.data + response.status);
      return response.data;
    } catch (e) {
      logger.error("Error retrieving users details ", e);
      if (e instanceof AxiosError && e.response?.status == 401) {
        throw new UnauthorizedException();
      }
      return [];
    }
  }
}

export default UserService;
