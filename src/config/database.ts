import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Task } from "../entities/task";
import { User } from "../entities/user";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Task, User],
  ssl: {
    rejectUnauthorized: false,
  },
});
