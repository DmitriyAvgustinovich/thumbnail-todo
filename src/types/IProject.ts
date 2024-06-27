import { ITask } from "./ITask";
import { IUser } from "./IUser";

export interface IProject {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  tasks: ITask[];
  contributors: IUser[];
}
