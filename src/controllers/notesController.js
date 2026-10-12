import createHttpError from "http-errors";
import { Note } from "../models/note.js";
// import { TAGS } from "../constants/tags.js";

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;

  // const notes = await Note.find().skip(skip).limit(perPage);

  // const totalNotes = await Note.countDocuments();

  const filters = {};

  const { tag } = req.query;
  if (tag) {
    filters.tag = { $eq: tag };
  }
  const { search } = req.query;
  if (search) {
  Note.where({
  $or: [
    { title: { $regex: search, $options: 'i' } },
    { content: { $regex: search, $options: 'i' } },
  ],
});
    // filters.title = { $eq: search };
}

  const [notes, totalNotes] = await Promise.all([
    Note.find(filters).skip(skip).limit(perPage),
    Note.countDocuments(filters)
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};


export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const specificNote = await Note.findOne({ _id: noteId });
  if (!specificNote) {
    throw createHttpError(404, "this note not found");
  }
  res.status(200).json(specificNote);
};

export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json(newNote);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const deletedNote = await Note.findOneAndDelete({ _id: noteId });
  if (!deletedNote) {
    throw createHttpError(404, "this note not found");
  }
  res.status(200).json(deletedNote);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const updatedNote = await Note.findOneAndUpdate({ _id: noteId }, req.body, {returnDocument: "after"});
  if (!updatedNote) {
    throw createHttpError(404, "this note not found");
  }
  res.status(200).json(updatedNote);
};
