// models/Task.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITask {
  title: string;
  roomId: string;
  createdBy: string;
  completed: boolean;
}

export interface ITaskDocument extends ITask, Document {}

const TaskSchema = new Schema<ITaskDocument>({
  title: { type: String, required: true },
  completed: { type: Boolean, required: true },
  roomId: { type: String, required: true },
  createdBy: { type: String, required: true },
});

export const Task: Model<ITaskDocument> = mongoose.model('Task', TaskSchema);
