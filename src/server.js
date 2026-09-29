import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import pino from 'pino-http';

const PORT = process.env.PORT ?? 3000;
const isInProduction = process.env.NODE_ENV === "production";

const app = express();


app.use(cors({
  origin: "*"
}));
app.use(helmet());
app.use(express.json());
app.use(pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.get(`/notes`, (req, res) => {
  res.status(200).json({"message": "Retrieved all notes"});
});

app.get(`/notes/:noteId`, (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({"message": `Retrieved note with ID: ${noteId}`});
});

app.get(`/test-error`, () => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  res.status(404).json({"message": "Route not found"});
});

app.use((error, req, res, next) => {
  res.status(500).json({message: isInProduction ? error.message : error});
});


app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
