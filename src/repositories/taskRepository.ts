import { Repository, DataSource, IsNull, Not } from "typeorm";
import { Task } from "../entities/task";
import { AppDataSource } from "../config/database";

export class TaskRepository {
  private repository: Repository<Task>;

  constructor(dataSource: DataSource = AppDataSource) {
    this.repository = dataSource.getRepository(Task);
  }

  async createTask(task: Task): Promise<Task> {
    return this.repository.save(task);
  }

  async findTaskById(id: number): Promise<Task | null> {
    return this.repository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ["user"],
    });
  }

  async findAllTasks(): Promise<Task[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      relations: ["user"],
    });
  }

  async findTasksByUserId(userId: number): Promise<Task[]> {
    return this.repository.find({
      where: { user: { id: userId }, deletedAt: IsNull() },
      relations: ["user"],
    });
  }

  async findDeletedTasks(): Promise<Task[]> {
    return this.repository.find({
      where: { deletedAt: Not(IsNull()) },
      withDeleted: true,
      relations: ["user"],
    });
  }

  async findDeletedTasksByUserId(userId: number): Promise<Task[]> {
    return this.repository.find({
      where: { user: { id: userId }, deletedAt: Not(IsNull()) },
      withDeleted: true,
      relations: ["user"],
    });
  }

  async updateTask(task: Task): Promise<Task> {
    return this.repository.save(task);
  }

  async softDeleteTask(id: number): Promise<void> {
    await this.repository.update(id, { deletedAt: new Date() });
  }
}
