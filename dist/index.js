import "dotenv/config";
import cors from "cors";
import express from "express";
import OpenAI from "openai";
import { createAssistant } from "./openai/createAssistant.js";
import { createRun } from "./openai/createRun.js";
import { createThread } from "./openai/createThread.js";
import { performRun } from "./openai/performRun.js";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
}));
let assistant = null;
let thread = null;
(async () => {
    try {
        assistant = await createAssistant(client);
        thread = await createThread(client);
        console.log("Assistant and thread initialized!");
    }
    catch (error) {
        console.error("Error initializing assistant or thread:", error);
    }
})();
async function handleChat(userInput) {
    if (!assistant || !thread) {
        throw new Error("Assistant or thread not initialized.");
    }
    await client.beta.threads.messages.create(thread.id, {
        role: "user",
        content: userInput,
    });
    const run = await createRun(client, thread, assistant.id);
    const result = await performRun(client, thread, run);
    if (result?.type === "text") {
        return result.text.value;
    }
    throw new Error("Unexpected response type from OpenAI.");
}
app.post("/chat", async (req, res) => {
    const { userInput } = req.body;
    if (!userInput) {
        res.json("Please provide an user's input");
    }
    const response = await handleChat(userInput);
    if (!response) {
        res.json("error in find response");
    }
    res.json({ response });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
