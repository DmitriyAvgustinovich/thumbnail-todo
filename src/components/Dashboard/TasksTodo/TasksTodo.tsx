import React from "react";

import { ClockCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { useGetTasksByUserIdQuery } from "store/api/tasks/tasks-api";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./TasksTodo.module.scss";
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";

export const TasksTodo = () => {
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] =
    React.useState(false);

  const { authUser } = useGetAuthUser();

  const { data: tasksData } = useGetTasksByUserIdQuery({
    userId: authUser?.id ?? "",
  });

  const handleOpenAddNewTaskModal = () => {
    setIsAddNewTaskModalOpen(true);
  };

  const handleCloseAddNewTaskModal = () => {
    setIsAddNewTaskModalOpen(false);
  };

  console.log(tasksData);

  return (
    <>
      <div className={styles.tasksTodoWrapper}>
        <div className={styles.tasksTodoHeaderWrapper}>
          <div className={styles.tasksTodoTodoHeaderTextWrapper}>
            <ClockCircleOutlined className={styles.tasksTodoTodoIcon} />
            To-Do
          </div>

          <div
            className={styles.tasksTodoAddTaskTextWrapper}
            onClick={handleOpenAddNewTaskModal}
          >
            <PlusOutlined className={styles.tasksTodoAddTaskIcon} />
            Add task
          </div>
        </div>
      </div>

      <AddTaskModal
        isAddNewTaskModalOpen={isAddNewTaskModalOpen}
        handleCloseAddNewTaskModal={handleCloseAddNewTaskModal}
      />
    </>
  );
};
