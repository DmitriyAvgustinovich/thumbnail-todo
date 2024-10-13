import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import { taskPriorities } from "shared/consts/task-priorities";
import { taskStatuses } from "shared/consts/task-statuses";
import { ITask } from "shared/types/ITask";

import styles from "./DashboardVitalTask.module.scss";
import { DashboardTask } from "../DashboardTask/DashboardTask";

interface IDashboardVitalTaskProps {
  tasksData: ITask[];
}

export const DashboardVitalTask = (props: IDashboardVitalTaskProps) => {
  const { tasksData } = props;

  // todo: сделать получение от сервера
  const vitalTasksData = tasksData?.filter(
    (task) =>
      task.priority === taskPriorities.high &&
      task.status !== taskStatuses.completed
  );

  return (
    <div className={styles.dashboardVitalTaskWrapper}>
      <div className={styles.dashboardVitalTaskHeaderWrapper}>
        <div className={styles.dashboardVitalTaskHeaderTextWrapper}>
          <ExclamationCircleOutlined
            className={styles.dashboardVitalTaskHeaderIcon}
          />
          Vital Task
        </div>
      </div>

      {vitalTasksData?.length ? (
        vitalTasksData?.map((task) => (
          <DashboardTask key={task.id} taskData={task} />
        ))
      ) : (
        <Empty
          className={styles.dashboardVitalTaskEmptyBlock}
          description="No vital tasks."
        />
      )}
    </div>
  );
};
