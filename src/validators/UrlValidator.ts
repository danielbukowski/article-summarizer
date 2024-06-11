import type { Request, Response, NextFunction } from "express";

export const validateUrl = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { url } = req.body;

	if (!url || typeof url !== "string")
		return res.status(400).json({
			message: "Request body parameter called url is not present",
		});

	if (!url.startsWith("https://"))
		return res.status(400).json({
			message: "Url should start with 'https://' prefix",
		});

	return next();
};
