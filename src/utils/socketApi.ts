import { UserChat, UserMessage } from "src/interfaces/chat";
import { io } from "../config/socket";

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
    console.log(`user connected with id:${socket.id}`);

    // Add new user
    socket.on("join", (data) => {
      addUser(data.role, socket.id);
      socket.join(data.role);
    });

    // Send a message
    socket.on("sendMessage", ({ role, message, userName, userId }: UserMessage) => {
      const messageData = {
        userId,
        userName,
        role,
        message,
      };
      // Seperate rooms for student and staff
      io.to(role).emit("getMessage", messageData);
    });

    // Disconnect user
    socket.on("disconnect", () => {
      console.log(`user with id:${socket.id} has disconnected`);
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};
