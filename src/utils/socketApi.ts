import { UserChat, ChatMessage } from "../interfaces/chat";
import { io } from "../config/socket";
import { ChatService } from "../services/chat";

const chatService = new ChatService();

export const socketAPI = () => {
  let users: UserChat[] = [];
  // adding new user into user array
  const addUser = (role: string, socketId: string): void => {
    !users.some((user) => user.socketId === socketId) && users.push({ role, socketId });
  };

  const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  io.on("connection", (socket) => {
    // Add new user
    socket.on("join", (data) => {
      addUser(data.role, socket.id);
      socket.join(data.role);
    });

    // Send a message
    socket.on(
      "sendMessage",
      async ({ role, message, userName, userId, profilePic }: ChatMessage) => {
        const messageData = {
          userId,
          userName,
          profilePic,
          role,
          message,
          date: Date.now(),
        };

        // Save message to mongoDB
        await chatService.createMessage(messageData);

        // Send message to the room
        io.to(role).emit("getMessage", messageData);
      }
    );

    // Disconnect user
    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};
