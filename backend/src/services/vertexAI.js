import { VertexAI } from "@google-cloud/vertexai";

const vertexAI = new VertexAI({
  project: process.env.GCP_PROJECT_ID,
  location: "us-central1",
});

const model = vertexAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function callGemini(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}
