import { Schema, model, Document } from "mongoose";

interface INote extends Document {
  title: string;
  content: string;
  timestamp: Date;
}

const NoteSchema = new Schema<INote>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date, 
    required: true,
    default: Date.now, 
  },
});
const Note = model<INote>("Note", NoteSchema);

export default Note;
