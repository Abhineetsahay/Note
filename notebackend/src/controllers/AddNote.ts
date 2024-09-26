import { Request, Response } from "express";
import Note from "../models/NoteSchema";

interface Note {
  title: string;
  content: string;
}

export const Addnote = async (req: Request, res: Response) => {
  try {
    const { title, content }:Note = req.body;
    if(!title||!content){
          return res.status(400).json({success:false,message:"Content or title Not Available"});
    }
    const newNote =new Note({
          title,
          content
    })
    const savedNote=await newNote.save();
    return res.status(200).json({success:true,message:"Note Added in Db successfully",savedNote});

  } catch (error) {
    console.error("Error deleting key:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
