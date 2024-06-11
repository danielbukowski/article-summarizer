import express, { type Express } from "express";
import { summaryRoutes } from "./routes/SummaryRoutes";
import { errorHandlerMiddleware } from "./middlewares/ErrorHandlerMiddleware";
import dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();

const app: Express = express();
const serverPort: number = Number.parseInt(process.env.SERVER_PORT) || 8080;

app.use(express.json());
app.use(helmet());

app.use("/summarize", summaryRoutes);

app.use(errorHandlerMiddleware);

app.listen(serverPort, () => {
	console.log(`Server is running on http://localhost:${serverPort}`);
});
