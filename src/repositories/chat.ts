import { ChatMessage, ChatMessageDocument } from "../interfaces/chat";
import { CRUD } from "./CRUD";
import { ChatModel } from "../models/chat";
import { Model } from "mongoose";

export class ChatRepo extends CRUD {
  model: Model<ChatMessageDocument> = ChatModel;

  // New chat message
  async createMessage(message: ChatMessage) {
    return this.model.create(message);
  }

  // Get messages by role
  async messagesByRole(role: "student" | "staff"): Promise<ChatMessageDocument[]> {
    return await this.findAll<ChatMessageDocument>({ role });
  }
}
