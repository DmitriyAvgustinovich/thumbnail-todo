export interface ITask {
  id: number;
  userId?: string;
  title: string;
  deadline: string;
  priority: string;
  description: string;
  status: string;
  createdAt: string;
  image: string;
}
