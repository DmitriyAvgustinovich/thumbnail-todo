import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import { authApi } from "./api/auth/auth-api";
import { columnsApi } from "./api/columns/columns-api";
import { commentsApi } from "./api/comments/comments-api";
import { projectsApi } from "./api/projects/projects-api";
import { tasksApi } from "./api/tasks/tasks-api";
import { usersApi } from "./api/users/users-api";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [columnsApi.reducerPath]: columnsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        authApi.middleware,
        tasksApi.middleware,
        usersApi.middleware,
        projectsApi.middleware,
        columnsApi.middleware,
        commentsApi.middleware,
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
