import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

mongoose
  .connect(process.env.MONGO_URI)
  .catch((err) => console.error("Connection error", err));

export default mongoose.connection;