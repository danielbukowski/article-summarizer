import OpenAI from "openai";
import dotenv from "dotenv";
import type { Stream } from "openai/streaming.mjs";
import type { ChatCompletionChunk } from "openai/resources/index.mjs";
dotenv.config();

export interface ModelSettings {
	modelName: string;
	numberOfSentences: number;
}

const openAiClient = new OpenAI();

export const availableModelNames: string[] = [
	"gpt-3.5-turbo",
	"gpt-4o",
	"gpt-4-turbo",
];

export const askForSummarizedArticle = async (
	article: string,
	modelSettings: ModelSettings,
): Promise<Stream<ChatCompletionChunk>> => {
	const systemPrompt: string = `Jesteś osobą podsumowującą zwięźle tekst. Pisz po polsku. Swoją odpowiedź zawrzyj maksymalnie w ${modelSettings.numberOfSentences} zdaniach.`;

	const completion = await openAiClient.chat.completions.create({
		messages: [
			{
				role: "system",
				content: systemPrompt,
			},
			{ role: "user", content: `Podsumuj ten artykuł: ${article}` },
		],
		model: modelSettings.modelName,
		stream: true,
	});

	return completion;
};
