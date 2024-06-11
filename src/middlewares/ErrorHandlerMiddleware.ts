import type { NextFunction, Request, Response } from "express";
import BasicApiError from "../errors/BasicApiError";

export const errorHandlerMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof BasicApiError) {
		return res.status(err.status).json({
			message: err.message,
		});
	}

	return res
		.status(500)
		.json({ message: "Something went wrong, please try again" });
};
