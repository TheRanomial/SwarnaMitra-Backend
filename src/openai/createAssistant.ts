import type { OpenAI } from "openai";

import type { Assistant } from "openai/resources/beta/assistants";
import { assistantPrompt } from "../constant/prompt.js";
import { tools } from "../tools/allTools.js";

export async function createAssistant(client: OpenAI): Promise<Assistant> {
	return await client.beta.assistants.create({
		model: "gpt-4o-mini",
		name: "SwarnaMitra",
		instructions: assistantPrompt,
		tools: Object.values(tools).map((tool) => tool.definition),
	});
}
