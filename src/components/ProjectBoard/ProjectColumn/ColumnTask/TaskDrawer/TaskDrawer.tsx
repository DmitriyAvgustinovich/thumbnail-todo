import { FontSizeOutlined } from "@ant-design/icons";
import { Drawer, Typography } from "antd";

import { useGetColumnByIdQuery } from "store/api/columns/columns-api";

import { ITask } from "types/ITask";

import { TaskComments } from "./TaskComments/TaskComments";
import { TaskDeadline } from "./TaskDeadline/TaskDeadline";
import { TaskDescription } from "./TaskDescription/TaskDescription";
import styles from "./TaskDrawer.module.scss";
import { TaskDrawerSidebar } from "./TaskDrawerSidebar/TaskDrawerSidebar";
import { TaskPriority } from "./TaskPriority/TaskPriority";
import { TaskStatus } from "./TaskStatus/TaskStatus";
import { TaskSubscribeNotifications } from "./TaskSubscribeNotifications/TaskSubscribeNotifications";
import { TaskTitle } from "./TaskTitle/TaskTitle";

interface ITaskDrawerProps {
  isTaskDrawerOpen: boolean;
  handleCloseTaskDrawer: () => void;
  taskData: ITask;
}

export const TaskDrawer = (props: ITaskDrawerProps) => {
  const { isTaskDrawerOpen, handleCloseTaskDrawer, taskData } = props;

  const { data: columnData } = useGetColumnByIdQuery({ id: taskData.columnId });

  return (
    <Drawer
      open={isTaskDrawerOpen}
      onClose={handleCloseTaskDrawer}
      size="large"
    >
      <div className={styles.taskDrawerWrapper}>
        <div className={styles.taskDrawerInfoWrapper}>
          <div className={styles.taskDrawerHeaderTitleWrapper}>
            <FontSizeOutlined className={styles.taskDrawerHeaderTitleIcon} />

            <div>
              <TaskTitle taskData={taskData} />
              <Typography.Text className={styles.taskDrawerInColumn} underline>
                In column: {columnData?.title}
              </Typography.Text>

              <Typography.Text className={styles.taskDrawerCreatedAt} underline>
                Created at: {taskData.createdAt}
              </Typography.Text>

              <Typography.Text className={styles.taskDrawerUpdatedAt} underline>
                Updated at: {taskData.updatedAt}
              </Typography.Text>
            </div>
          </div>

          <TaskDescription taskData={taskData} />
          <TaskPriority taskData={taskData} />
          <TaskStatus taskData={taskData} />
          <TaskDeadline taskData={taskData} />
          <TaskSubscribeNotifications />
          <TaskComments taskData={taskData} />
        </div>

        <TaskDrawerSidebar
          taskData={taskData}
          handleCloseTaskDrawer={handleCloseTaskDrawer}
        />
      </div>
    </Drawer>
  );
};
