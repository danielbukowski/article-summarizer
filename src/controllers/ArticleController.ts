import type { Request, Response, NextFunction } from "express";
import { getSummarizedArticle } from "../services/ArticleService";
import type { ModelSettings } from "../clients/OpenAiClient";
import type { ChatCompletionChunk } from "openai/resources/index.mjs";
import type { Stream } from "openai/streaming.mjs";

interface ArticleRequestBody extends ModelSettings {
	url: string;
}

export const summarizeArticle = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { url, numberOfSentences, modelName }: ArticleRequestBody = req.body;

		const summarizedArticleStream: Stream<ChatCompletionChunk> =
			await getSummarizedArticle(url, {
				numberOfSentences,
				modelName,
			});

		res.type("text/event-stream");
		for await (const chunk of summarizedArticleStream) {
			res.write(chunk.choices[0]?.delta?.content || "");
		}

		res.end();
	} catch (error: unknown) {
		next(error);
	}
};
