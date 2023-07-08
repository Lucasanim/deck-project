import mongoose from "mongoose";
import {logger} from "../logger/Logger";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    logger.info("MongoDB Database successfully connected")
  } catch (error) {
    logger.error("Error while opening database connection ", error)
    process.exit(1);
  }
}

export default connectDatabase