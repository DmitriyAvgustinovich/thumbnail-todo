export interface INotification {
  id?: string;
  projectId: string;
  columnId?: string;
  title: string;
  message: string;
  createdAt: string;
}
