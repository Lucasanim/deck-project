import jwt from "jsonwebtoken";
import { logger } from "../logger/Logger";
import RSAKeyUtils from "./RSAKeyUtils";

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, RSAKeyUtils.getKey(), { algorithms: ["RS256"] });
  } catch (error) {
    logger.error("Error verifying token ", error);
  }
};

export { verifyToken };
