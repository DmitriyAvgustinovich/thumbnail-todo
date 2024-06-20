import React from "react";

import { ClockCircleOutlined, PlusOutlined } from "@ant-design/icons";

import styles from "./TasksTodo.module.scss";
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";

export const TasksTodo = () => {
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] =
    React.useState(false);

  const handleOpenAddNewTaskModal = () => {
    setIsAddNewTaskModalOpen(true);
  };

  const handleCloseAddNewTaskModal = () => {
    setIsAddNewTaskModalOpen(false);
  };

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
