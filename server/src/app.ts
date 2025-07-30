import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use('/tasks', taskRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || '', {
  dbName: 'todo-collab'
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

export default app;
