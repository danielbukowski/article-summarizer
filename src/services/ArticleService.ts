import axios from "axios";
import * as cheerio from "cheerio";
import {
	type ModelSettings,
	askForSummarizedArticle,
} from "../clients/OpenAiClient";
import type { ChatCompletionChunk } from "openai/resources/index.mjs";
import type { Stream } from "openai/streaming.mjs";
import { AxiosError } from "axios";
import BasicApiError from "../errors/BasicApiError";

export const getSummarizedArticle = async (
	articleUrl: string,
	modelSettings: ModelSettings,
): Promise<Stream<ChatCompletionChunk>> => {
	try {
		const rawHtmlResponse = await axios.get<string>(articleUrl, {
			timeout: 2000,
			responseType: "text",
		});

		const scrappedArticle: string = scrapeArticleTextFromPage(
			rawHtmlResponse.data,
		);
		const summarizedArticle = await askForSummarizedArticle(
			scrappedArticle,
			modelSettings,
		);

		return summarizedArticle;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			if (error.code === "ENOTFOUND") {
				throw new BasicApiError("Invalid URL", 400);
			}
		}

		throw error;
	}
};
export const scrapeArticleTextFromPage = (rawPage: string) => {
	const $ = cheerio.load(rawPage);
	let formattedText = "";

	$("h1, h2, h3, h4, h5, h6, p").each((i: number, el: cheerio.Element) => {
		if (el.tagName !== "p") {
			formattedText += `\n${$(el).text().trim()}\n\n`;
			return;
		}

		formattedText += `${$(el).text().trim()}\n`;
	});
	formattedText = formattedText.trim();

	return formattedText;
};
