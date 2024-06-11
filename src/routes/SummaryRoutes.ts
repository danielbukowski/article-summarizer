import express, { type Router } from "express";
import { summarizeArticle } from "../controllers/ArticleController";
import { validateUrl } from "../validators/UrlValidator";
import { validateModelSettings } from "../validators/ModelConfigValidator";

export const summaryRoutes: Router = express.Router();

summaryRoutes.post("/", [validateUrl, validateModelSettings], summarizeArticle);
