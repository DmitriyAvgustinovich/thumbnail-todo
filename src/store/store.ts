import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import { authApi } from "./api/auth/auth-api";
import { columnsApi } from "./api/columns/columns-api";
import { commentsApi } from "./api/comments/comments-api";
import { projectContributorsApi } from "./api/projectContributors/project-contributors-api";
import { projectsApi } from "./api/projects/projects-api";
import { taskContributorsApi } from "./api/taskContributors/task-contributors-api";
import { tasksApi } from "./api/tasks/tasks-api";
import { uploadApi } from "./api/upload/upload-api";
import { usersApi } from "./api/users/users-api";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [columnsApi.reducerPath]: columnsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  [projectContributorsApi.reducerPath]: projectContributorsApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [taskContributorsApi.reducerPath]: taskContributorsApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        authApi.middleware,
        columnsApi.middleware,
        commentsApi.middleware,
        projectContributorsApi.middleware,
        projectsApi.middleware,
        taskContributorsApi.middleware,
        tasksApi.middleware,
        uploadApi.middleware,
        usersApi.middleware,
      ]),
  });
};

export const store = setupStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
