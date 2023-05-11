import asyncHandler from "express-async-handler";
import { ChatService } from "../../services/chat";
import { dataFormattor } from "../../utils/JSON-formattor";

const chatService = new ChatService();

// All staff chats
export const allChatMessages = asyncHandler(async (req, res) => {
  const allChatMessages = await chatService.getAllMessages("staff");
  res.json(dataFormattor(allChatMessages));
});
