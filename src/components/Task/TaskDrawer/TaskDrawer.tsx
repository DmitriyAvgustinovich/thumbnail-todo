import { Drawer, Typography } from "antd";

import { getConditionTaskPriorityColor } from "utils/dashboard/get-condition-task-priority-color";
import { getConditionTaskStatusColor } from "utils/dashboard/get-condition-task-status-color";
import { getConvertDate } from "utils/general/get-convert-date";

import { ITask } from "types/ITask";

import styles from "./TaskDrawer.module.scss";

interface ITaskDrawerProps {
  isTaskDrawerOpen: boolean;
  handleCloseTaskDrawer: () => void;
  taskData: ITask;
}

export const TaskDrawer = (props: ITaskDrawerProps) => {
  const { isTaskDrawerOpen, handleCloseTaskDrawer, taskData } = props;

  return (
    <Drawer
      open={isTaskDrawerOpen}
      onClose={handleCloseTaskDrawer}
      size="large"
    >
      <div className={styles.taskDrawerHeaderWrapper}>
        <img className={styles.taskDrawerImage} src={taskData.image} alt="" />

        <div className={styles.taskDrawerHeaderTextWrapper}>
          <Typography.Text className={styles.taskDrawerTitle}>
            {taskData.title}
          </Typography.Text>

          <Typography.Text className={styles.taskDrawerPriority}>
            Priority:{" "}
            <b
              style={{
                color: getConditionTaskPriorityColor(taskData.priority),
              }}
            >
              {taskData.priority}
            </b>
          </Typography.Text>

          <Typography.Text className={styles.taskDrawerStatus}>
            Status:{" "}
            <b style={{ color: getConditionTaskStatusColor(taskData.status) }}>
              {taskData.status}
            </b>
          </Typography.Text>

          <Typography.Text className={styles.taskDrawerDeadline}>
            Deadline: {getConvertDate(taskData.deadline)}
          </Typography.Text>

          <Typography.Text className={styles.taskDrawerCreatedAt}>
            Created at: {taskData.createdAt}
          </Typography.Text>
        </div>
      </div>

      <div className={styles.taskDrawerDescriptionWrapper}>
        <Typography.Text className={styles.taskDrawerDescription}>
          {taskData.description}
        </Typography.Text>
      </div>
    </Drawer>
  );
};
