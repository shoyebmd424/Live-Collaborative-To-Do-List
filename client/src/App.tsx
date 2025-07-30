import { useEffect, useState } from 'react';
import './App.css';
import type { Task } from './Types';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const socket = io(API_URL);

const ROOM_ID = 'room-1'; 
const USERNAME = 'JohnDoe';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', { roomId: ROOM_ID, username: USERNAME });

    const fetchTasks = async () => {
      try {
        const res = await axios.get<{ success: boolean; data: Task[] }>(
          `${API_URL}/tasks/room/${ROOM_ID}`
        );
        setTasks(res.data.data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      }
    };

    fetchTasks();

    socket.on('taskCreated', (task: Task) => {
      setTasks(prev => [...prev, task]);
    });

    socket.on('taskDeleted', (id: string) => {
      setTasks(prev => prev.filter(task => task._id !== id));
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskDeleted');
    };
  }, []);

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    try {
      await axios.post(`${API_URL}/tasks`, {
        title: newTask,
        completed: false,
        roomId: ROOM_ID,
        createdBy: USERNAME,
      });
      setNewTask('');
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>📝 Live Collaborative To-Do</h1>
      <input
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title}
            
            <button onClick={() => handleDelete(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
