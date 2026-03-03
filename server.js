import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
const PORT = process.env.PORT || 8000;
import bcrypt from "bcryptjs";
import { initSocket } from "./src/socket/chat.js";

// Create HTTP server (important for sockets later)
const server = http.createServer(app);

// initialize socket
initSocket(server);

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// OPTIONAL: Attach Socket.io in future
// import socketInit from "./sockets/socket.js";
// socketInit(server);

const hash = await bcrypt.hash("123456789", 10);
