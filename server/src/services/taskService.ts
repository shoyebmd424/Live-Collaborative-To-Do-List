import { ITask, Task } from '../models/Task';

export const getAllTasks = async () => {
  return await Task.find();
};

export const getTaskByRoomId = async (roomId: string) => {
  return await Task.find({ roomId: roomId });
};

export const createTask = async (data: ITask) => {
  return await Task.create(data);
};

export const deleteTask = async (id: string) => {
  return await Task.findByIdAndDelete(id);
};
