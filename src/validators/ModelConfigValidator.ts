import type { Request, Response, NextFunction } from "express";
import { availableModelNames } from "../clients/OpenAiClient";

export const validateModelSettings = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { modelName, numberOfSentences } = req.body;

	if (!modelName || typeof modelName !== "string")
		return res.status(400).json({
			message: "Body parameter called modelName is not present",
		});

	if (
		!availableModelNames.find((availableModel) => availableModel === modelName)
	) {
		return res.status(400).json({
			message: "Model name is not supported",
		});
	}

	if (!numberOfSentences || typeof numberOfSentences !== "number") {
		return res.status(400).json({
			message: "Body parameter called numberOfSentences is not present",
		});
	}
	req.body.numberOfSentences = Math.max(2, Math.min(23, numberOfSentences));

	return next();
};
