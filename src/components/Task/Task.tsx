import React from "react";

import { Button, Typography } from "antd";

import { CircleIcon } from "components/CircleIcon/CircleIcon";

import { getConditionTaskPriorityColor } from "utils/dashboard/get-condition-task-priority-color";
import { getConditionTaskStatusColor } from "utils/dashboard/get-condition-task-status-color";
import { getConvertDate } from "utils/general/get-convert-date";

import { ITask } from "types/ITask";

import styles from "./Task.module.scss";
import { TaskDrawer } from "../ProjectBoard/ProjectColumn/ColumnTask/TaskDrawer/TaskDrawer";

interface ITaskProps {
  taskData: ITask;
}

export const Task = (props: ITaskProps) => {
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
      <div className={styles.taskWrapper}>
        <CircleIcon
          width={15}
          height={15}
          color={getConditionTaskStatusColor(taskData.status)}
          isFilled={false}
        />

        <div className={styles.taskMainInfoWrapper}>
          <Typography.Text className={styles.taskDeadline}>
            Deadline: {getConvertDate(taskData.deadline)}
          </Typography.Text>

          <Typography.Text className={styles.taskTitle}>
            {taskData.title}
          </Typography.Text>

          <Typography.Text className={styles.taskDescription}>
            {taskData.description}
          </Typography.Text>

          <div className={styles.taskSecondInfoWrapper}>
            <Typography.Text className={styles.taskPriority}>
              Priority:{" "}
              <b
                style={{
                  color: getConditionTaskPriorityColor(taskData.priority),
                }}
              >
                {taskData.priority}
              </b>
            </Typography.Text>

            <Typography.Text className={styles.taskStatus}>
              Status:{" "}
              <b
                style={{ color: getConditionTaskStatusColor(taskData.status) }}
              >
                {taskData.status}
              </b>
            </Typography.Text>

            <Button
              className={styles.taskDetailsButton}
              type="primary"
              onClick={handleOpenTaskDrawer}
            >
              Details
            </Button>
          </div>
        </div>

        <div className={styles.taskAdditionalInfoWrapper}>
          <img className={styles.taskImage} src={taskData.image} alt="" />

          <Typography.Text className={styles.taskCreatedAt}>
            Created at: {taskData.createdAt}
          </Typography.Text>
        </div>
      </div>

      <TaskDrawer
        isTaskDrawerOpen={isTaskDrawerOpen}
        handleCloseTaskDrawer={handleCloseTaskDrawer}
        taskData={taskData}
      />
    </>
  );
};
