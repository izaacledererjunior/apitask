export interface TaskDTO {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  userId: number;
}
