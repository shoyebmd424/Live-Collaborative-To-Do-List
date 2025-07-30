import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskService";
import { getIO } from "../socket";

export const getAllTasks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

export const getByRoomId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.getTaskByRoomId(req.params.roomId);
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.createTask(req.body);
    getIO().to(task.roomId).emit("taskCreated", task);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    getIO().emit("taskDeleted", req.params.id);
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
