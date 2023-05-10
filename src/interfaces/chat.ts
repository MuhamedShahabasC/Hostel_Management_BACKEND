// User in Chat
export interface UserChat {
  role: string;
  socketId: string;
}

// Message
export interface UserMessage {
  userId: string;
  userName: string;
  role: string;
  message: string;
  profilePic: string;
}
