import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import taskValidation from '../../validations/task.validation';
import taskController from '../../controllers/task.controller';

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(taskValidation.createTask), taskController.createTask)
  .get(auth(), validate({}), taskController.getTasks);

router
  .route('/:id')
  .put(auth(), validate(taskValidation.updateTask), taskController.updateTask)
  .delete(auth(), validate(taskValidation.deleteTask), taskController.deleteTask);

export default router;

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *             example:
 *               title: Sample Task
 *               description: This is a sample task
 *               status: pending
 *     responses:
 *       "201":
 *         description: Task created successfully
 *       "400":
 *         description: Bad request
 *   get:
 *     summary: Retrieve all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: A list of tasks
 *       "400":
 *         description: Bad request
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *             example:
 *               title: Updated Task
 *               description: Updated description
 *               status: in_progress
 *     responses:
 *       "200":
 *         description: Task updated successfully
 *       "400":
 *         description: Bad request
 *       "404":
 *         description: Task not found
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       "204":
 *         description: Task deleted successfully
 *       "404":
 *         description: Task not found
 */
