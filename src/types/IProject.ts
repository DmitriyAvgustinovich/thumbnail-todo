export interface IProject {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  adminUserId?: string;
}
