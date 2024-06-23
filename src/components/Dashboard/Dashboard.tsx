import { Spin } from "antd";

import { PageLayout } from "components/PageLayout/PageLayout";

import { useGetTasksByUserIdQuery } from "store/api/tasks/tasks-api";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { CompletedTask } from "./CompletedTask/CompletedTask";
import styles from "./Dashboard.module.scss";
import { DashboardSkeleton } from "./DashboardSkeleton/DashboardSkeleton";
import { TaskStatus } from "./TaskStatus/TaskStatus";
import { TaskTodo } from "./TaskTodo/TaskTodo";

export const Dashboard = () => {
  const { authUser, isAuthUserLoading } = useGetAuthUser();

  const { isLoading: isMyTasksDataLoading } = useGetTasksByUserIdQuery({
    userId: authUser?.id ?? "",
  });

  return (
    <PageLayout>
      <h1 className={styles.dashboardTitle}>
        Welcome back,{" "}
        {isAuthUserLoading ? <DashboardSkeleton /> : authUser?.lastName}{" "}
        &#x1F44B;
      </h1>

      {isAuthUserLoading || isMyTasksDataLoading ? (
        <Spin className={styles.dashboardSpinner} size="large" />
      ) : (
        <div className={styles.dashboardWrapper}>
          <TaskTodo />

          <div>
            <TaskStatus />
            <CompletedTask />
          </div>
        </div>
      )}
    </PageLayout>
  );
};
