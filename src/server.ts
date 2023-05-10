import app from "./app";
import { io } from "./config/socket";
import { socketAPI } from "./utils/socketApi";

const PORT = process.env.PORT;

const server = app.listen(PORT, (): void => {
  console.log(`Server is running on ${process.env.PORT}`);
});

// Attaching backend with socket
io.attach(server);
socketAPI();
