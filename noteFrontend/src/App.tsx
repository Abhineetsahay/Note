import { useEffect, useState,useCallback } from 'react';
import axios from 'axios';

interface Note {
  _id: string;
  title: string;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const backendURL = process.env.REACT_APP_BACKENDURL || 'http://localhost:5000/api/v1';
  
  const fetchNotes = useCallback(async () => {
    try {
      const response = await axios.get(`${backendURL}/getNote`);
      setNotes(response.data.Notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }, [backendURL]);

  const addNote = async () => {
    try {
      const response = await axios.post(`${backendURL}/addNote`, newNote);
      setNotes([...notes, response.data]); 
      setNewNote({ title: '', content: '' });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`${backendURL}/deleteNote/${id}`);
      setNotes(notes.filter((note) => note._id !== id)); 
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Note Manager</h1>

      <div className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add Note</h2>
        <input
          type="text"
          placeholder="Note Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <textarea
          placeholder="Note Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <button 
          onClick={addNote}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>

      {/* List of notes */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-2xl font-semibold mb-4">Notes</h2>
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note._id} className="border-b border-gray-300 py-4">
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <p className="text-gray-700 mb-2">{note.content}</p>
                <button 
                  onClick={() => deleteNote(note._id)}
                  className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
