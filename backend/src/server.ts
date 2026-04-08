import app from "./app.ts";
import http from "http";

const server = http.createServer(app);
const PORT = 4000 | 5000;

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
