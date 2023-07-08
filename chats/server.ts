import express from "express"
import {logger} from "./src/utils/logger/Logger";
import connectDatabase from "./src/utils/database/DatabaseUtils"
import ChatHandler from "./src/handler/ChatHandler";

require("dotenv").config({ path: `./${process.env.ENV || "dev"}.env` });

connectDatabase();

const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT, () => {
    logger.info("Server started on port: " + process.env.PORT)
});


ChatHandler.getInstance().initializeWebSocket(server)
