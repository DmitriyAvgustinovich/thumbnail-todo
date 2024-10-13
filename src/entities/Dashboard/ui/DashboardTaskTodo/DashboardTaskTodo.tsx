import { ClockCircleOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import { taskStatuses } from "shared/consts/task-statuses";
import { ITask } from "shared/types/ITask";

import styles from "./DashboardTaskTodo.module.scss";
import { DashboardTask } from "../DashboardTask/DashboardTask";

interface IDashboardTaskTodoProps {
  tasksData: ITask[];
}

export const DashboardTaskTodo = (props: IDashboardTaskTodoProps) => {
  const { tasksData } = props;

  // todo: сделать получение от сервера
  const notCompletedTasksData = tasksData?.filter(
    (task) => task.status !== taskStatuses.completed
  );

  return (
    <div className={styles.dashboardTaskTodoWrapper}>
      <div className={styles.dashboardTaskTodoHeaderWrapper}>
        <div className={styles.dashboardTaskTodoHeaderTextWrapper}>
          <ClockCircleOutlined className={styles.dashboardTaskTodoHeaderIcon} />
          To-Do
        </div>
      </div>

      {notCompletedTasksData?.length ? (
        notCompletedTasksData?.map((task) => (
          <DashboardTask key={task.id} taskData={task} />
        ))
      ) : (
        <Empty
          className={styles.dashboardTaskTodoEmptyBlock}
          description="No to do tasks."
        />
      )}
    </div>
  );
};
