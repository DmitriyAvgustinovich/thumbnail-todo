import React from "react";

import { Button, Typography } from "antd";

import { CircleIcon } from "components/CircleIcon/CircleIcon";

import { getConditionTaskPriorityColor } from "utils/dashboard/get-condition-task-priority-color";
import { getConditionTaskStatusColor } from "utils/dashboard/get-condition-task-status-color";
import { getConvertDate } from "utils/general/get-convert-date";

import { ITask } from "types/ITask";

import { AdditionalActionsPopover } from "./AdditionalActionsPopover/AdditionalActionsPopover";
import styles from "./Task.module.scss";
import { TaskDrawer } from "./TaskDrawer/TaskDrawer";

interface ITaskProps extends ITask {}

export const Task = (props: ITaskProps) => {
  const { title, description, priority, status, deadline, createdAt } = props;

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
          color={getConditionTaskStatusColor(status)}
          isFilled={false}
        />

        <div className={styles.taskMainInfoWrapper}>
          <Typography.Text className={styles.taskDeadline}>
            Deadline: {getConvertDate(deadline)}
          </Typography.Text>
          <Typography.Text className={styles.taskTitle}>
            {title}
          </Typography.Text>

          <Typography.Text className={styles.taskDescription}>
            {description}
          </Typography.Text>

          <div className={styles.taskSecondInfoWrapper}>
            <Typography.Text className={styles.taskPriority}>
              Priority:{" "}
              <b style={{ color: getConditionTaskPriorityColor(priority) }}>
                {priority}
              </b>
            </Typography.Text>

            <Typography.Text className={styles.taskStatus}>
              Status:{" "}
              <b style={{ color: getConditionTaskStatusColor(status) }}>
                {status}
              </b>
            </Typography.Text>

            <Button
              className={styles.taskShowMoreButton}
              type="primary"
              onClick={handleOpenTaskDrawer}
            >
              Show more
            </Button>
          </div>
        </div>

        <div className={styles.taskAdditionalInfoWrapper}>
          <AdditionalActionsPopover {...props} />
          <img className={styles.taskImage} src={props.image} alt="" />

          <Typography.Text className={styles.taskCreatedAt}>
            Created at: {createdAt}
          </Typography.Text>
        </div>
      </div>

      <TaskDrawer
        isTaskDrawerOpen={isTaskDrawerOpen}
        handleCloseTaskDrawer={handleCloseTaskDrawer}
        taskData={props}
      />
    </>
  );
};
