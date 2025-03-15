// Testes gerados por IA.
import "reflect-metadata";
import { container } from "tsyringe";
import { TaskService } from "../services/taskService";
import { TaskRepository } from "../repositories/taskRepository";
import { Task } from "../entities/task";
import { TaskDTO } from "../dtos/taskDTO.ts";

// Mock TaskRepository
const mockTaskRepository: Partial<TaskRepository> = {
  createTask: jest.fn(),
  findTaskById: jest.fn(),
  findAllTasks: jest.fn(),
  findTasksByUserId: jest.fn(),
  findDeletedTasks: jest.fn(),
  findDeletedTasksByUserId: jest.fn(),
  updateTask: jest.fn(),
  softDeleteTask: jest.fn(),
};

container.registerInstance(TaskRepository, mockTaskRepository);

describe("TaskService", () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = container.resolve(TaskService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new task", async () => {
    const task = new Task();
    task.id = 1;
    task.name = "Test Task";
    task.description = "Task description";
    task.status = "pending";
    task.createdAt = new Date();
    task.updatedAt = new Date();
    task.user = { id: 1 } as any;

    (mockTaskRepository.createTask as jest.Mock).mockResolvedValue(task);

    const result = await taskService.createTask(
      "Test Task",
      "Task description",
      "pending",
      1
    );

    expect(result).toEqual({
      id: task.id,
      name: task.name,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      userId: task.user.id,
    });
    expect(mockTaskRepository.createTask).toHaveBeenCalledWith(
      expect.any(Task)
    );
  });

  it("should get a task by id", async () => {
    const task = new Task();
    task.id = 1;
    task.name = "Test Task";
    task.description = "Task description";
    task.status = "pending";
    task.createdAt = new Date();
    task.updatedAt = new Date();
    task.user = { id: 1 } as any;

    (mockTaskRepository.findTaskById as jest.Mock).mockResolvedValue(task);

    const result = await taskService.getTaskById(1);

    expect(result).toEqual({
      id: task.id,
      name: task.name,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      userId: task.user.id,
    });
    expect(mockTaskRepository.findTaskById).toHaveBeenCalledWith(1);
  });

  it("should return null if task not found", async () => {
    (mockTaskRepository.findTaskById as jest.Mock).mockResolvedValue(null);

    const result = await taskService.getTaskById(1);

    expect(result).toBeNull();
    expect(mockTaskRepository.findTaskById).toHaveBeenCalledWith(1);
  });

  it("should get all tasks", async () => {
    const tasks = [new Task(), new Task()];

    tasks[0].id = 1;
    tasks[0].name = "Test Task 1";
    tasks[0].description = "Task description 1";
    tasks[0].status = "pending";
    tasks[0].createdAt = new Date();
    tasks[0].updatedAt = new Date();
    tasks[0].user = { id: 1 } as any;

    tasks[1].id = 2;
    tasks[1].name = "Test Task 2";
    tasks[1].description = "Task description 2";
    tasks[1].status = "completed";
    tasks[1].createdAt = new Date();
    tasks[1].updatedAt = new Date();
    tasks[1].user = { id: 2 } as any;

    (mockTaskRepository.findAllTasks as jest.Mock).mockResolvedValue(tasks);

    const result = await taskService.getAllTasks();

    expect(result).toEqual(
      tasks.map((task) => ({
        id: task.id,
        name: task.name,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        userId: task.user.id,
      }))
    );
    expect(mockTaskRepository.findAllTasks).toHaveBeenCalled();
  });

  it("should update a task", async () => {
    const task = new Task();
    task.id = 1;
    task.name = "Test Task";
    task.description = "Task description";
    task.status = "pending";
    task.createdAt = new Date();
    task.updatedAt = new Date();
    task.user = { id: 1 } as any;

    const updatedTask = {
      ...task,
      name: "Updated Task",
      description: "Updated description",
      status: "completed",
    };

    (mockTaskRepository.findTaskById as jest.Mock).mockResolvedValue(task);
    (mockTaskRepository.updateTask as jest.Mock).mockResolvedValue(updatedTask);

    const result = await taskService.updateTask(
      task.id,
      updatedTask.name,
      updatedTask.description,
      updatedTask.status,
      updatedTask.user.id
    );

    expect(result).toEqual({
      id: updatedTask.id,
      name: updatedTask.name,
      description: updatedTask.description,
      status: updatedTask.status,
      createdAt: updatedTask.createdAt,
      updatedAt: updatedTask.updatedAt,
      userId: updatedTask.user.id,
    });
    expect(mockTaskRepository.findTaskById).toHaveBeenCalledWith(task.id);
    expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(
      expect.any(Task)
    );
  });

  it("should return null if task to update not found", async () => {
    (mockTaskRepository.findTaskById as jest.Mock).mockResolvedValue(null);

    const result = await taskService.updateTask(
      1,
      "Updated Task",
      "Updated description",
      "completed",
      1
    );

    expect(result).toBeNull();
    expect(mockTaskRepository.findTaskById).toHaveBeenCalledWith(1);
  });

  it("should delete a task", async () => {
    await taskService.deleteTask(1);

    expect(mockTaskRepository.softDeleteTask).toHaveBeenCalledWith(1);
  });
});
function mockResolvedValue(tasks: Task[]) {
  return jest.fn().mockResolvedValue(tasks);
}
