import { Server } from "socket.io";

export const io = new Server( {
    cors: {
        origin: process.env.FRONTEND as string,
        methods: ["GET", "POST"],
      },
      
});
