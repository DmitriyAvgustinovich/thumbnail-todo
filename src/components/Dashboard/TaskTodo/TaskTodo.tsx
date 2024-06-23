import React from "react";

import { ClockCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import { Task } from "components/Task/Task";

import { useGetTasksByUserIdQuery } from "store/api/tasks/tasks-api";

import { taskStatuses } from "constants/dashboard/task-statuses";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./TaskTodo.module.scss";
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";

export const TaskTodo = () => {
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] =
    React.useState(false);

  const { authUser } = useGetAuthUser();

  const { data: myTasksData } = useGetTasksByUserIdQuery({
    userId: authUser?.id ?? "",
  });

  const handleOpenAddNewTaskModal = () => {
    setIsAddNewTaskModalOpen(true);
  };

  const handleCloseAddNewTaskModal = () => {
    setIsAddNewTaskModalOpen(false);
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
            onClick={handleOpenAddNewTaskModal}
          >
            <PlusOutlined className={styles.taskTodoAddTaskIcon} />
            Add task
          </div>
        </div>

        {tasksDataWithoutCompletedStatus?.length ? (
          tasksDataWithoutCompletedStatus?.map((task) => (
            <Task key={task.id} {...task} />
          ))
        ) : (
          <Empty
            className={styles.taskTodoEmptyBlock}
            description="No tasks."
          />
        )}
      </div>

      <AddTaskModal
        isAddNewTaskModalOpen={isAddNewTaskModalOpen}
        handleCloseAddNewTaskModal={handleCloseAddNewTaskModal}
      />
    </>
  );
};
