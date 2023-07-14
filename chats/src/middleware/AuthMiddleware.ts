import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt/jwtUtils";
import { logger } from "../utils/logger/Logger";
import { NextFunction, Response } from "express";
import AuthRequest from "../models/AuthRequest";

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let authToken = req.header("authorization");

    if (!authToken) {
      return res.status(401).send(`Unauthorized`);
    }

    if (authToken.includes("Bearer ")) {
      authToken = authToken.split("Bearer ")[1];
    }

    const { sub } = verifyToken(authToken) as JwtPayload;

    req.userId = sub;
    req.authToken = authToken;
    next();
  } catch (error) {
    logger.error(error);
    return res.status(401).send(`Unauthorized`);
  }
};
