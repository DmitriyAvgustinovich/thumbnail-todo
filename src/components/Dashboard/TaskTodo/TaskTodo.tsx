import { ClockCircleOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import { Task } from "components/Task/Task";

import { useGetTasksByCreatedUserIdQuery } from "store/api/tasks/tasks-api";

import { taskStatuses } from "constants/task/task-statuses";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./TaskTodo.module.scss";

export const TaskTodo = () => {
  const { authUser } = useGetAuthUser();

  const { data: myTasksData } = useGetTasksByCreatedUserIdQuery({
    createdUserId: authUser?.id ?? "",
  });

  const tasksDataWithoutCompletedStatus = myTasksData?.filter(
    (task) => task.status !== taskStatuses.completed
  );

  return (
    <div className={styles.taskTodoWrapper}>
      <div className={styles.taskTodoHeaderWrapper}>
        <div className={styles.taskTodoHeaderTextWrapper}>
          <ClockCircleOutlined className={styles.taskTodoHeaderIcon} />
          To-Do
        </div>
      </div>

      {tasksDataWithoutCompletedStatus?.length ? (
        tasksDataWithoutCompletedStatus?.map((task) => (
          <Task key={task.id} taskData={task} />
        ))
      ) : (
        <Empty className={styles.taskTodoEmptyBlock} description="No tasks." />
      )}
    </div>
  );
};
