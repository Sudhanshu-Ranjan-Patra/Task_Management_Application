import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.use(protect); // protect all following routes
router.route('/').get(getTasks).post(createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

export default router;
