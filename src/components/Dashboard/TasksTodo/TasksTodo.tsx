import React from "react";

import { ClockCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { Task } from "components/Task/Task";

import { useGetTasksByUserIdQuery } from "store/api/tasks/tasks-api";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./TasksTodo.module.scss";
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";

export const TasksTodo = () => {
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] =
    React.useState(false);

  const { authUser } = useGetAuthUser();

  const { data: myTasksData, isLoading: isMyTasksDataLoading } =
    useGetTasksByUserIdQuery({
      userId: authUser?.id ?? "",
    });

  const handleOpenAddNewTaskModal = () => {
    setIsAddNewTaskModalOpen(true);
  };

  const handleCloseAddNewTaskModal = () => {
    setIsAddNewTaskModalOpen(false);
  };

  return (
    <>
      <div
        className={styles.tasksTodoWrapper}
        style={{ textAlign: `${isMyTasksDataLoading ? "center" : "left"}` }}
      >
        {isMyTasksDataLoading ? (
          <Spin size="large" />
        ) : (
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
        )}

        {myTasksData?.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </div>

      <AddTaskModal
        isAddNewTaskModalOpen={isAddNewTaskModalOpen}
        handleCloseAddNewTaskModal={handleCloseAddNewTaskModal}
      />
    </>
  );
};
