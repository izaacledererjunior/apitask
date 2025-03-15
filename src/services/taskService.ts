import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { TaskDTO } from "../dtos/taskDTO.ts";
import { TaskRepository } from "../repositories/taskRepository";
import { Task } from "../entities/task";

@injectable()
export class TaskService {
  constructor(@inject(TaskRepository) private taskRepository: TaskRepository) {}

  async createTask(
    name: string,
    description: string,
    status: string,
    userId: number
  ): Promise<TaskDTO> {
    const task = new Task();
    task.name = name;
    task.description = description;
    task.status = status;
    task.createdAt = new Date();
    task.updatedAt = new Date();
    task.user = { id: userId } as any;

    const savedTask = await this.taskRepository.createTask(task);
    return this.toDTO(savedTask);
  }

  async getTaskById(id: number): Promise<TaskDTO | null> {
    const task = await this.taskRepository.findTaskById(id);
    if (!task) return null;
    return this.toDTO(task);
  }

  async getAllTasks(): Promise<TaskDTO[]> {
    const tasks = await this.taskRepository.findAllTasks();
    return tasks.map((task) => this.toDTO(task));
  }

  async getTasksByUserId(userId: number): Promise<TaskDTO[]> {
    const tasks = await this.taskRepository.findTasksByUserId(userId);
    return tasks.map((task) => this.toDTO(task));
  }

  async getDeletedTasks(): Promise<TaskDTO[]> {
    const tasks = await this.taskRepository.findDeletedTasks();
    return tasks.map((task) => this.toDTO(task));
  }

  async getDeletedTasksByUserId(userId: number): Promise<TaskDTO[]> {
    const tasks = await this.taskRepository.findDeletedTasksByUserId(userId);
    return tasks.map((task) => this.toDTO(task));
  }

  async updateTask(
    id: number,
    name: string,
    description: string,
    status: string,
    userId: number
  ): Promise<TaskDTO | null> {
    const task = await this.taskRepository.findTaskById(id);
    if (!task) return null;
    task.name = name;
    task.description = description;
    task.status = status;
    task.updatedAt = new Date();
    task.user = { id: userId } as any;

    const updatedTask = await this.taskRepository.updateTask(task);
    return this.toDTO(updatedTask);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.softDeleteTask(id);
  }

  private toDTO(task: Task): TaskDTO {
    if (!task.user) {
      throw new Error("User not found for the task");
    }

    return {
      id: task.id,
      name: task.name,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt,
      userId: task.user.id,
    };
  }
}
