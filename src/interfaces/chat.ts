import { Document, ObjectId } from "mongoose";

// User in Chat
export interface UserChat {
  role: string;
  socketId: string;
}

// Message
export interface ChatMessage {
  userId: string;
  userName: string;
  role: string;
  message: string;
  profilePic: string;
  date: number;
}

// Message document
export interface ChatMessageDocument extends Document {
    userId: ObjectId;
    userName: string;
    role: string;
    message: string;
    profilePic: string;
    date: Date
  }