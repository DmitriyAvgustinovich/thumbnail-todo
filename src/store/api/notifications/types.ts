import { INotification } from "shared/types/INotification";

export type TGetNotificationsByProjectIdResponse = INotification[];
export interface IGetNotificationsByProjectIdRequest {
  projectId: string;
}

export type TAddNotificationResponse = INotification;
export type TAddNotificationRequest = INotification;

export type TDeleteNotificationResponse = void;
export interface IDeleteNotificationRequest {
  id: string;
}
