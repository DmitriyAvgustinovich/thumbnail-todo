import React from "react";

import { ClockCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import { Task } from "components/Task/Task";

import { useGetTasksByUserIdQuery } from "store/api/tasks/tasks-api";

import { taskStatuses } from "constants/task/task-statuses";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./TaskTodo.module.scss";
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";

export const TaskTodo = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] =
    React.useState(false);

  const { authUser } = useGetAuthUser();

  const { data: myTasksData } = useGetTasksByUserIdQuery({
    userId: authUser?.id ?? "",
  });

  const handleOpenAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const handleCloseAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const tasksDataWithoutCompletedStatus = myTasksData?.filter(
    (task) => task.status !== taskStatuses.completed
  );

  return (
    <>
      <div className={styles.taskTodoWrapper}>
        <div className={styles.taskTodoHeaderWrapper}>
          <div className={styles.taskTodoHeaderTextWrapper}>
            <ClockCircleOutlined className={styles.taskTodoHeaderIcon} />
            To-Do
          </div>

          <div
            className={styles.taskTodoAddTaskTextWrapper}
            onClick={handleOpenAddTaskModal}
          >
            <PlusOutlined className={styles.taskTodoAddTaskIcon} />
            Add task
          </div>
        </div>

        {tasksDataWithoutCompletedStatus?.length ? (
          tasksDataWithoutCompletedStatus?.map((task) => (
            <Task key={task.id} taskData={task} />
          ))
        ) : (
          <Empty
            className={styles.taskTodoEmptyBlock}
            description="No tasks."
          />
        )}
      </div>

      <AddTaskModal
        isAddTaskModalOpen={isAddTaskModalOpen}
        handleCloseAddTaskModal={handleCloseAddTaskModal}
      />
    </>
  );
};
