import React from "react";

import { Typography } from "antd";

import { ITask } from "types/ITask";

import styles from "./ColumnTask.module.scss";
import { TaskDrawer } from "./TaskDrawer/TaskDrawer";

interface IColumnTaskProps {
  taskData: ITask;
}

export const ColumnTask = (props: IColumnTaskProps) => {
  const { taskData } = props;

  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = React.useState(false);

  const handleOpenTaskDrawer = () => {
    setIsTaskDrawerOpen(true);
  };

  const handleCloseTaskDrawer = () => {
    setIsTaskDrawerOpen(false);
  };

  return (
    <>
      <div className={styles.columnTaskWrapper} onClick={handleOpenTaskDrawer}>
        <Typography.Text>{taskData?.title}</Typography.Text>
      </div>

      <TaskDrawer
        isTaskDrawerOpen={isTaskDrawerOpen}
        handleCloseTaskDrawer={handleCloseTaskDrawer}
        taskData={taskData}
      />
    </>
  );
};
