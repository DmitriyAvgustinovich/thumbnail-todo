import { CheckCircleOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import { taskStatuses } from "shared/consts/task-statuses";
import { ITask } from "shared/types/ITask";

import styles from "./DashboardCompletedTask.module.scss";
import { DashboardTask } from "../DashboardTask/DashboardTask";

interface IDashboardCompletedTaskProps {
  tasksData: ITask[];
}

export const DashboardCompletedTask = (props: IDashboardCompletedTaskProps) => {
  const { tasksData } = props;

  // todo: сделать получение от сервера
  const completedTasksData = tasksData?.filter(
    (task) => task.status === taskStatuses.completed
  );

  return (
    <div className={styles.dashboardCompletedTaskWrapper}>
      <div className={styles.dashboardCompletedTaskHeaderWrapper}>
        <div className={styles.dashboardCompletedTaskHeaderTextWrapper}>
          <CheckCircleOutlined
            className={styles.dashboardCompletedTaskHeaderIcon}
          />
          Completed Task
        </div>
      </div>

      {completedTasksData?.length ? (
        completedTasksData?.map((task) => (
          <DashboardTask key={task.id} taskData={task} />
        ))
      ) : (
        <Empty
          className={styles.dashboardCompletedTaskEmptyBlock}
          description="No completed tasks."
        />
      )}
    </div>
  );
};
