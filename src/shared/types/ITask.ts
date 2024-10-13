export interface ITask {
  id: string;
  createdUserId?: string;
  columnId: string;
  projectId: string;
  title: string;
  deadline: string;
  priority: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  assignedToUserId: string;
  cover?: string;
}
