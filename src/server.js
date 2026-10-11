import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import router from "./routes/notesRoutes.js";
import { logger } from "./middleware/logger.js";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use(logger);

app.use(router);

app.use((notFoundHandler));

app.use((errorHandler));

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
