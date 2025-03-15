import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { TaskService } from "../services/taskService";

export class TaskController {
  constructor() {
    this.createTask = this.createTask.bind(this);
    this.getTaskById = this.getTaskById.bind(this);
    this.getAllTasks = this.getAllTasks.bind(this);
    this.getTasksByUserId = this.getTasksByUserId.bind(this);
    this.getDeletedTasks = this.getDeletedTasks.bind(this);
    this.getDeletedTasksByUserId = this.getDeletedTasksByUserId.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  async createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, description, status, userId } = req.body;
    const taskService = container.resolve(TaskService);
    const task = await taskService.createTask(
      name,
      description,
      status,
      userId
    );
    res.status(201).json(task);
  }

  async getTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const taskService = container.resolve(TaskService);
    const task = await taskService.getTaskById(Number(id));
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json(task);
  }

  async getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const taskService = container.resolve(TaskService);
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  }

  async getTasksByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId } = req.params;
    const taskService = container.resolve(TaskService);
    const tasks = await taskService.getTasksByUserId(Number(userId));
    res.status(200).json(tasks);
  }

  async getDeletedTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const taskService = container.resolve(TaskService);
    const tasks = await taskService.getDeletedTasks();
    res.status(200).json(tasks);
  }

  async getDeletedTasksByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId } = req.params;
    const taskService = container.resolve(TaskService);
    const tasks = await taskService.getDeletedTasksByUserId(Number(userId));
    res.status(200).json(tasks);
  }

  async updateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { name, description, status, userId } = req.body;
    const taskService = container.resolve(TaskService);
    const task = await taskService.updateTask(
      Number(id),
      name,
      description,
      status,
      userId
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json(task);
  }

  async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const taskService = container.resolve(TaskService);
    await taskService.deleteTask(Number(id));
    res.status(200).json({ message: "Task deleted" });
  }
}
