import asyncHandler from "express-async-handler";
import { ChatService } from "../../services/chat";
import { dataFormattor } from "../../utils/JSON-formattor";

const chatService = new ChatService();

// All chats by room
export const allChatMessages = asyncHandler(async (req, res) => {
  if (!/^(student|staff)$/.test(req.params.room)) req.params.room = "student";
  const allChatMessages = await chatService.getAllMessages(req.params.room as "student" | "staff");
  res.json(dataFormattor(allChatMessages));
});
