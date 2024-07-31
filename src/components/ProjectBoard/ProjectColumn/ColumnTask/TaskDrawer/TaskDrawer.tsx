import { Drawer } from "antd";

import { ITask } from "types/ITask";

import { TaskComments } from "./TaskComments/TaskComments";
import { TaskDeadline } from "./TaskDeadline/TaskDeadline";
import { TaskDescription } from "./TaskDescription/TaskDescription";
import styles from "./TaskDrawer.module.scss";
import { SidebarAssignedToAction } from "./TaskDrawerSidebar/SidebarAssignedToAction/SidebarAssignedToAction";
import { SidebarCoverAction } from "./TaskDrawerSidebar/SidebarCoverAction/SidebarCoverAction";
import { SidebarDeleteTaskAction } from "./TaskDrawerSidebar/SidebarDeleteTaskAction/SidebarDeleteTaskAction";
import { SidebarTaskContributorsAction } from "./TaskDrawerSidebar/SidebarTaskContributorsAction/SidebarTaskContributorsAction";
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

  return (
    <Drawer
      open={isTaskDrawerOpen}
      onClose={handleCloseTaskDrawer}
      size="large"
    >
      <div className={styles.taskDrawerWrapper}>
        <div className={styles.taskDrawerInfoWrapper}>
          <TaskTitle taskData={taskData} />
          <TaskDescription taskData={taskData} />
          <TaskPriority taskData={taskData} />
          <TaskStatus taskData={taskData} />
          <TaskDeadline taskData={taskData} />
          <TaskSubscribeNotifications />
          <TaskComments taskData={taskData} />
        </div>

        <div className={styles.taskDrawerSidebarWrapper}>
          <SidebarAssignedToAction taskData={taskData} />
          <SidebarTaskContributorsAction taskData={taskData} />
          <SidebarCoverAction />
          <SidebarDeleteTaskAction
            taskData={taskData}
            handleCloseTaskDrawer={handleCloseTaskDrawer}
          />
        </div>
      </div>
    </Drawer>
  );
};
