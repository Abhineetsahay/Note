import { useEffect, useState } from 'react';
import axios from 'axios';


interface Note {
  _id: string;
  title: string;
  content: string;
}

const App = () => {
  const [tasks, setTasks] = useState<Note[]>([]);
  const [newTask, setNewTask] = useState({ title: '', content: '' });

  // Fetch tasks from the backend
  const backendURL =  'http://localhost:5000/api/v1';

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${backendURL}/getNote`);
      setTasks(response.data.Notes); // Assuming response.data is an array of notes
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task
  const addTask = async () => {
    try {
      const response = await axios.post(`${backendURL}/addNote`, newTask);
      setTasks([...tasks, response.data]); // Append the new task to the state
      setNewTask({ title: '', content: '' }); // Reset the input fields
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Delete a task by id
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${backendURL}/deleteNote/${id}`);
      setTasks(tasks.filter((task) => task._id !== id)); // Remove the task from the state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);
  console.log(tasks);
  
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>

      {/* Add new task */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <textarea
          placeholder="Task Content"
          value={newTask.content}
          onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <button 
          onClick={addTask}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* List of tasks */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <ul>
            {tasks?.map((task) => (
              <li key={task._id} className="border-b border-gray-300 py-4">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-gray-700 mb-2">{task.content}</p>
                <button 
                  onClick={() => deleteTask(task._id)}
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
