import { PieChartOutlined } from "@ant-design/icons";
import { Progress, Typography } from "antd";

import { useGetAuthUser } from "shared/lib/hooks/use-get-auth-user";
import { CircleIcon } from "shared/ui/CircleIcon/CircleIcon";

import styles from "./DashboardTaskStatus.module.scss";
import { useGetTasksByAssignedToUserIdQuery } from "../../api/dashboard-id";
import { getTaskStatusesPercent } from "../../model/utils/get-task-statuses-percent";

export const DashboardTaskStatus = () => {
  const { authUser } = useGetAuthUser();

  const { data: assignedToMeTasksData } = useGetTasksByAssignedToUserIdQuery({
    id: authUser?.id ?? "",
  });

  const {
    completedTasksPercentage,
    inProgressTasksPercentage,
    notStartedTasksPercentage,
  } = getTaskStatusesPercent({
    assignedToMeTasksData: assignedToMeTasksData ?? [],
  });

  return (
    <div className={styles.dashboardTaskStatusWrapper}>
      <div className={styles.dashboardTaskStatusHeaderWrapper}>
        <div className={styles.dashboardTaskStatusHeaderTextWrapper}>
          <PieChartOutlined className={styles.dashboardTaskStatusHeaderIcon} />
          Task Status
        </div>
      </div>

      <div className={styles.dashboardTaskStatusCirclesWrapper}>
        <div>
          <Progress
            type="circle"
            percent={completedTasksPercentage}
            strokeColor="var(--completed-task-color)"
          />

          <div className={styles.dashboardTaskStatusCirclesTextWrapper}>
            <CircleIcon
              width={15}
              height={15}
              color="var(--completed-task-color)"
              isFilled
            />

            <Typography.Text className={styles.dashboardTaskStatusCirclesText}>
              Completed
            </Typography.Text>
          </div>
        </div>

        <div>
          <Progress
            type="circle"
            percent={inProgressTasksPercentage}
            strokeColor="var(--in-progress-task-color)"
          />

          <div className={styles.dashboardTaskStatusCirclesTextWrapper}>
            <CircleIcon
              width={15}
              height={15}
              color="var(--in-progress-task-color)"
              isFilled
            />

            <Typography.Text className={styles.dashboardTaskStatusCirclesText}>
              In Progress
            </Typography.Text>
          </div>
        </div>

        <div>
          <Progress
            type="circle"
            percent={notStartedTasksPercentage}
            strokeColor="var(--not-started-task-color)"
          />

          <div className={styles.dashboardTaskStatusCirclesTextWrapper}>
            <CircleIcon
              width={15}
              height={15}
              color="var(--not-started-task-color)"
              isFilled
            />

            <Typography.Text className={styles.dashboardTaskStatusCirclesText}>
              Not Started
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
};
