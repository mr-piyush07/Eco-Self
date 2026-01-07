import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { db } from "../services/firestore.js";
import { callGemini } from "../services/vertexAI.js";
import { buildFutureSelfPrompt } from "../services/promptBuilder.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const uid = req.user.uid;
  const { question } = req.body;

  const userDoc = await db.collection("users").doc(uid).get();
  if (!userDoc.exists) {
    return res.status(400).json({ error: "User profile not found" });
  }

  const prompt = buildFutureSelfPrompt(userDoc.data(), question);
  const reply = await callGemini(prompt);

  res.json({ reply });
});

export default router;
