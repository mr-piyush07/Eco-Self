import express from "express";
import chatRoute from "./routes/chat.js";



const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("EchoSelf backend running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/chat", chatRoute);

