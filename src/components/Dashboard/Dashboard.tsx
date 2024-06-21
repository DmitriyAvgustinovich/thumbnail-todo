import { PageLayout } from "components/PageLayout/PageLayout";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./Dashboard.module.scss";
import { DashboardSkeleton } from "./DashboardSkeleton/DashboardSkeleton";
import { TasksTodo } from "./TasksTodo/TasksTodo";

export const Dashboard = () => {
  const { authUser, isAuthUserLoading } = useGetAuthUser();

  return (
    <PageLayout>
      <h1 className={styles.dashboardTitle}>
        Welcome back,{" "}
        {isAuthUserLoading ? <DashboardSkeleton /> : authUser?.lastName}{" "}
        &#x1F44B;
      </h1>

      <div className={styles.dashboardWrapper}>
        <TasksTodo />
      </div>
    </PageLayout>
  );
};
