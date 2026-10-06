import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import noteRoutes from "./routes/notesRoutes.js";
import { logger } from "./middleware/logger.js";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(noteRoutes);

app.use(cors({
  origin: "*"
}));
app.use(helmet());
app.use(express.json());

app.use(logger);

app.use((notFoundHandler));

app.use((errorHandler));

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
