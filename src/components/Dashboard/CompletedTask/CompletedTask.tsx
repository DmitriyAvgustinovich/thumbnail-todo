import { CheckCircleOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import { Task } from "components/Task/Task";

import { useGetTasksByUserIdQuery } from "store/api/tasks/tasks-api";

import { taskStatuses } from "constants/task/task-statuses";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./CompletedTask.module.scss";

export const CompletedTask = () => {
  const { authUser } = useGetAuthUser();

  const { data: myTasksData } = useGetTasksByUserIdQuery({
    userId: authUser?.id ?? "",
  });

  const completedTasksData = myTasksData?.filter(
    (task) => task.status === taskStatuses.completed
  );

  return (
    <div className={styles.completedTaskWrapper}>
      <div className={styles.completedTaskHeaderWrapper}>
        <div className={styles.completedTaskHeaderTextWrapper}>
          <CheckCircleOutlined className={styles.completedTaskHeaderIcon} />
          Completed Task
        </div>
      </div>

      {completedTasksData?.length ? (
        completedTasksData?.map((task) => (
          <Task key={task.id} taskData={task} />
        ))
      ) : (
        <Empty
          className={styles.completedTaskEmptyBlock}
          description="No completed tasks."
        />
      )}
    </div>
  );
};
