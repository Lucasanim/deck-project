import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  members: [
    { type: Schema.Types.Number }
  ],
  messages: [
    {
      body: { type: String, required: true },
      sender: { type: Schema.Types.Number, required: true },
      createdAt: { type: Date, default: new Date() },
      deleted: {type: Schema.Types.Boolean, default: false },
      seen:  {type: Schema.Types.Boolean, default: false },
      seenAt: { type: Date },
    }
  ],
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model("Chat", ChatSchema);
