export interface IProject {
  id: string;
  title: string;
  description: string;
  cover: string;
  createdAt: string;
  updatedAt: string;
  adminUserId?: string;
  visibility: string;
}
