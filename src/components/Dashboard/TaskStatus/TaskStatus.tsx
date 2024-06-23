import { PieChartOutlined } from "@ant-design/icons";
import { Progress, Typography } from "antd";

import { CircleIcon } from "components/CircleIcon/CircleIcon";

import { useGetTaskStatuses } from "hooks/dashboard/use-get-task-statuses";

import styles from "./TaskStatus.module.scss";

export const TaskStatus = () => {
  const {
    completedTasksPercentage,
    inProgressTasksPercentage,
    notStartedTasksPercentage,
  } = useGetTaskStatuses();

  return (
    <div className={styles.tasksStatusWrapper}>
      <div className={styles.tasksStatusHeaderWrapper}>
        <div className={styles.tasksStatusHeaderTextWrapper}>
          <PieChartOutlined className={styles.tasksStatusHeaderIcon} />
          Task Status
        </div>
      </div>

      <div className={styles.tasksStatusCirclesWrapper}>
        <div>
          <Progress
            type="circle"
            percent={completedTasksPercentage}
            strokeColor="var(--completed-task-color)"
          />

          <div className={styles.tasksStatusCirclesTextWrapper}>
            <CircleIcon
              width={15}
              height={15}
              color="var(--completed-task-color)"
              isFilled
            />

            <Typography.Text className={styles.tasksStatusCirclesText}>
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

          <div className={styles.tasksStatusCirclesTextWrapper}>
            <CircleIcon
              width={15}
              height={15}
              color="var(--in-progress-task-color)"
              isFilled
            />

            <Typography.Text className={styles.tasksStatusCirclesText}>
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

          <div className={styles.tasksStatusCirclesTextWrapper}>
            <CircleIcon
              width={15}
              height={15}
              color="var(--not-started-task-color)"
              isFilled
            />

            <Typography.Text className={styles.tasksStatusCirclesText}>
              Not Started
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
};
