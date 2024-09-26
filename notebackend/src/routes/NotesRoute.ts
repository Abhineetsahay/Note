import express from 'express';
import { Addnote } from '../controllers/AddNote';
import { GetNote } from '../controllers/GetNote';
import { DeleteNote } from '../controllers/DeleteNote';

const Notesrouter=express.Router();

Notesrouter.post("/addNote",Addnote);
Notesrouter.get("/getNote",GetNote);
Notesrouter.delete("/deleteNote/:id",DeleteNote)
export default Notesrouter; 