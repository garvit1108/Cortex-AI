import { ChatGoogleGenerativeAI }
  from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq"
import dotenv from "dotenv"
dotenv.config()
import { ChatOpenRouter } from "@langchain/openrouter";

const openRouter = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens:2500
  // other params...
});


export const gemini =
  new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY
  });

const groq = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
  // other params...
})


export const getModel =
  (agent) => {

    switch (agent) {

      case "coding":
        return openRouter;

      case "image":
        return groq;

      case "search":
        return groq;

      case "chat":
        return groq;
      case "vision":
        return gemini;
      default:
        return groq;

    }

  }