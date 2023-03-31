import mongoose from "mongoose";
import { ConnectionOptions } from "tls";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGO_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "HostelManagement",
      } as ConnectionOptions
    );
    console.log("Database is connected");
  } catch (error: any) {
    throw new Error("Internal Server Error");
  }
};

export default connectDB;
