"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logger_1 = __importDefault(require("./src/utils/logger/Logger"));
const DatabaseUtils_1 = __importDefault(require("./src/utils/database/DatabaseUtils"));
const app = (0, express_1.default)();
const server = require("http").Server(app);
const io = require("socket.io")(server);
require("dotenv").config({ path: "./.env" });
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
// const { addUser, removeUser, findConnectedUser } = require("./utilsServer/roomActions");
// const {
//   loadMessages,
//   sendMsg,
//   setMsgToUnread,
//   deleteMsg
// } = require("./utilsServer/messageActions");
(0, DatabaseUtils_1.default)();
// io.on("connection", socket => {
//   socket.on("join", async ({ userId }) => {
//     const users = await addUser(userId, socket.id);
//     console.log(users);
//     setInterval(() => {
//       socket.emit("connectedUsers", {
//         users: users.filter(user => user.userId !== userId)
//       });
//     }, 10000);
//   });
//   socket.on("likePost", async ({ postId, userId, like }) => {
//     const {
//       success,
//       name,
//       profilePicUrl,
//       username,
//       postByUserId,
//       error
//     } = await likeOrUnlikePost(postId, userId, like);
//     if (success) {
//       socket.emit("postLiked");
//       if (postByUserId !== userId) {
//         const receiverSocket = findConnectedUser(postByUserId);
//         if (receiverSocket && like) {
//           // WHEN YOU WANT TO SEND DATA TO ONE PARTICULAR CLIENT
//           io.to(receiverSocket.socketId).emit("newNotificationReceived", {
//             name,
//             profilePicUrl,
//             username,
//             postId
//           });
//         }
//       }
//     }
//   });
//   socket.on("loadMessages", async ({ userId, messagesWith }) => {
//     const { chat, error } = await loadMessages(userId, messagesWith);
//     !error ? socket.emit("messagesLoaded", { chat }) : socket.emit("noChatFound");
//   });
//   socket.on("sendNewMsg", async ({ userId, msgSendToUserId, msg }) => {
//     const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg);
//     const receiverSocket = findConnectedUser(msgSendToUserId);
//     if (receiverSocket) {
//       // WHEN YOU WANT TO SEND MESSAGE TO A PARTICULAR SOCKET
//       io.to(receiverSocket.socketId).emit("newMsgReceived", { newMsg });
//     }
//     //
//     else {
//       await setMsgToUnread(msgSendToUserId);
//     }
//     !error && socket.emit("msgSent", { newMsg });
//   });
//   socket.on("deleteMsg", async ({ userId, messagesWith, messageId }) => {
//     const { success } = await deleteMsg(userId, messagesWith, messageId);
//     if (success) socket.emit("msgDeleted");
//   });
//   socket.on("sendMsgFromNotification", async ({ userId, msgSendToUserId, msg }) => {
//     const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg);
//     const receiverSocket = findConnectedUser(msgSendToUserId);
//     if (receiverSocket) {
//       // WHEN YOU WANT TO SEND MESSAGE TO A PARTICULAR SOCKET
//       io.to(receiverSocket.socketId).emit("newMsgReceived", { newMsg });
//     }
//     //
//     else {
//       await setMsgToUnread(msgSendToUserId);
//     }
//     !error && socket.emit("msgSentFromNotification");
//   });
//   socket.on("disconnect", () => removeUser(socket.id));
// });
server.listen(PORT, (error) => {
    if (error) {
        Logger_1.default.error("Error while trying to initialize application ", error);
    }
    Logger_1.default.info("Server started on port: ", PORT);
});
