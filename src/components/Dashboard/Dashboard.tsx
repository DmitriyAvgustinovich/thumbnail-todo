import { LoadingOutlined } from "@ant-design/icons";
import { Tabs, Typography } from "antd";

import { PageLayout } from "components/PageLayout/PageLayout";

import { useGetTasksByAssignedToUserIdQuery } from "store/api/tasks/tasks-api";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./Dashboard.module.scss";
import { DashboardCompletedTask } from "./DashboardCompletedTask/DashboardCompletedTask";
import { DashboardSkeleton } from "./DashboardSkeleton/DashboardSkeleton";
import { DashboardTaskStatus } from "./DashboardTaskStatus/DashboardTaskStatus";
import { DashboardTaskTodo } from "./DashboardTaskTodo/DashboardTaskTodo";
import { DashboardVitalTask } from "./DashboardVitalTask/DashboardVitalTask";

export const Dashboard = () => {
  const { authUser, isAuthUserLoading } = useGetAuthUser();

  const {
    data: assignedToMeTasksData,
    isLoading: isAssignedToMeTasksDataLoading,
  } = useGetTasksByAssignedToUserIdQuery({
    id: authUser?.id ?? "",
  });

  const tabsItems = [
    {
      key: "0",
      label: "Dashboard",
      children: isAssignedToMeTasksDataLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className={styles.dashboardWrapper}>
          <DashboardTaskTodo tasksData={assignedToMeTasksData ?? []} />
          <DashboardCompletedTask tasksData={assignedToMeTasksData ?? []} />
          <DashboardVitalTask tasksData={assignedToMeTasksData ?? []} />
        </div>
      ),
    },
    {
      key: '1',
      label: 'Statistics',
      children: <DashboardTaskStatus />
    }
  ];

  return (
    <PageLayout>
      <Typography.Title>
        Welcome back, {isAuthUserLoading ? <LoadingOutlined /> : authUser?.name}{" "}
        &#x1F44B;
      </Typography.Title>

      <Tabs items={tabsItems} />
    </PageLayout>
  );
};
