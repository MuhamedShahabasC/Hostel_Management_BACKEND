import ErrorResponses from "../error/ErrorResponses";
import { ChatMessage, ChatMessageDocument } from "../interfaces/chat";
import { ChatRepo } from "../repositories/chat";

export class ChatService extends ChatRepo {
  // New Message
  async newMessage(message: ChatMessage): Promise<ChatMessageDocument> {
    return await this.createMessage(message);
  }

  // View all messages by role
  async getAllMessages(role: "student" | "staff"): Promise<ChatMessageDocument[]> {
    const allMessages = await this.messagesByRole(role);
    if (allMessages.length === 0) throw ErrorResponses.noDataFound("chat");
    return allMessages;
  }
}
