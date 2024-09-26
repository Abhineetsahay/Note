import express from 'express';
import dotenv from "dotenv";
import { database } from './database/db.config';
import Notesrouter from './routes/NotesRoute';
import cors from 'cors'
dotenv.config();


const app = express();
const PORT = process.env.PORT||3020;

app.use(cors());
app.use(express.json());
app.use("/api/v1",Notesrouter);

database(); 


app.get("/", (req, res) => {
  res.send("Hello, Node Express!");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
