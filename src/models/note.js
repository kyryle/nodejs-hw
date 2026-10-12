import { Schema, model } from "mongoose";
import { TAGS } from "../constants/tags.js";

const notesSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    default: "",
    trim: true,
    required: false,
  },
  tag: {
    type: String,
    enum: ["Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important", "Todo"],
    default: "Todo",
  }
}, { timestamps: true },
);

notesSchema.index({ tag: TAGS});

export const Note = model("Note", notesSchema);
