import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import serverless from "serverless-http";
import logger from "./observability/logger";
import swaggerSpec from "./swagger.config";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import * as dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import { AppDataSource } from "./config/database";
import { validate } from "./middlewares/validate";
import { TaskController } from "./controllers/taskController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { createTaskSchema, updateTaskSchema } from "./utils/validation";

dotenv.config();

const PORT = process.env.PORT || 9002;
const app = express();
const taskController = new TaskController();

app.use(express.json());
app.use(cors());

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               userId:
 *                 type: number
 *     responses:
 *       201:
 *         description: The created task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 userId:
 *                   type: number
 */
app.post(
  "/tasks",
  authMiddleware,
  validate(createTaskSchema),
  taskController.createTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: The task description by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 userId:
 *                   type: number
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.get("/tasks/:id", authMiddleware, taskController.getTaskById);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   userId:
 *                     type: number
 */
app.get("/tasks", authMiddleware, taskController.getAllTasks);

/**
 * @swagger
 * /tasks/user/{userId}:
 *   get:
 *     summary: Get tasks by user ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of tasks by user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   userId:
 *                     type: number
 */
app.get("/tasks/user/:userId", authMiddleware, taskController.getTasksByUserId);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               userId:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 userId:
 *                   type: number
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.put(
  "/tasks/:id",
  authMiddleware,
  validate(updateTaskSchema),
  taskController.updateTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.delete("/tasks/:id", authMiddleware, taskController.deleteTask);

/**
 * @swagger
 * /tasks/deleted:
 *   get:
 *     summary: Get all deleted tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all deleted tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   userId:
 *                     type: number
 */
app.get("/tasks/deleted", authMiddleware, taskController.getDeletedTasks);

/**
 * @swagger
 * /tasks/deleted/user/{userId}:
 *   get:
 *     summary: Get deleted tasks by user ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of deleted tasks by user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   userId:
 *                     type: number
 */
app.get(
  "/tasks/deleted/user/:userId",
  authMiddleware,
  taskController.getDeletedTasksByUserId
);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    logger.info("Data Source has been initialized!");
  })
  .catch((err) => {
    logger.error("Error during Data Source initialization", err);
    process.exit(1);
  });

if (process.env.NODE_ENV !== "lambda") {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export const handler = serverless(app);
