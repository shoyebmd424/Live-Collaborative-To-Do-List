import express from 'express';
import { createTask, deleteTask, getAllTasks, getByRoomId } from '../controller/taskController';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.delete('/:roomId', getByRoomId);

export default router;
