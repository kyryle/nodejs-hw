import createHttpError from "http-errors";
import { Note } from "../models/note.js";

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
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
  res.status(201).json({"Note created": newNote});
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const deletedNote = await Note.findOneAndDelete({ _id: noteId });
  if (!deletedNote) {
    throw createHttpError(404, "this note not found");
  }
  res.status(200).json({"Note deleted": deletedNote});
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const updatedNote = await Note.findOneAndUpdate({ _id: noteId }, req.body, {returnDocument: "after"});
  if (!updatedNote) {
    throw createHttpError(404, "this note not found");
  }
  res.status(200).json({"Note updated": updatedNote});
};
