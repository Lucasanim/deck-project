import express from "express";
import ChatService from "../service/ChatService";
import { logger } from "../utils/logger/Logger";
import AuthRequest from "../models/AuthRequest";

const chatRouter = express.Router();

chatRouter.get("/", async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;

    const chats = await ChatService.getChatsWithUsers(userId!, req.authToken!);

    return res.json(chats);
  } catch (error) {
    logger.error("Error retrieving user chats", error);
    return res.status(500).send("Server Error");
  }
});

chatRouter.post("/:receiverId", async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;
    const receiverId = req.params.receiverId;

    if (!receiverId) {
      return res.status(400).send("No receiver id provided");
    }

    const chat = ChatService.createChat([Number(userId), Number(receiverId)]);

    return res.status(201).json(chat);
  } catch (error) {
    logger.error("Error creating user chat", error);
    return res.status(500).send("Server Error");
  }
});

export default chatRouter;
