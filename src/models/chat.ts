import { model, Model, Schema } from "mongoose";
import { ChatMessageDocument } from "src/interfaces/chat";

const chatSchema = new Schema<ChatMessageDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "A message should have a sender ID"],
  },

  userName: {
    type: String,
    required: [true, "A message should have a sender name"],
  },
  role: {
    type: String,
    enum: {
      values: ["student", "staff"],
      message: "Invalid role ({VALUE})",
    },
  },
  message: {
    type: String,
    required: [true, "A chat must contain a message"],
  },
  date: {
    type: Date,
    required: [true, "A message must have a date"],
  },
  profilePic: {
    type: String,
  },
});

export const ChatModel: Model<ChatMessageDocument> = model("Chat", chatSchema);
