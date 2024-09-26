import { Request,Response } from "express"
import Note from "../models/NoteSchema";

export const GetNote=async(req:Request,res:Response)=>{
       const Notes=await Note.find();
       return res.status(200).json({success:true,Notes}); 
}