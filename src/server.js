import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

const PORT = process.env.PORT ?? 3000;
const isInProduction = process.env.NODE_ENV ?? true;

const app = express();


app.use(cors({
  origin: "*"
}));
app.use(helmet());

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
  if (isInProduction === "development") {
    res.status(500).json({ "message": `${error}` });
  } else {
    res.status(500).json({ "message": `${error.message}` });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});