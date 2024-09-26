import { Request, Response } from "express";
import Note from "../models/NoteSchema";

export const DeleteNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    // Correct: Pass the id directly
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    return res.json({ success: true, message: 'Note deleted', note });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
