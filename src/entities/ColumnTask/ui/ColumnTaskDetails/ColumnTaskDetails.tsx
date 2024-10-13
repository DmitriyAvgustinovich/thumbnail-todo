import React from "react";

import { Drawer } from "antd";

import { TaskDataProvider } from "app/providers/TaskDataProvider";
import { TaskFormProvider } from "app/providers/TaskFormProvider";

import { DeleteColumnTask } from "features/deleteColumnTask";
import { ColumnTaskCover } from "features/setColumnTaskCover";

import { ITask } from "shared/types/ITask";

import styles from "./ColumnTaskDetails.module.scss";
import { ColumnTaskAssignedTo } from "../ColumnTaskAssignedTo/ColumnTaskAssignedTo";
import { ColumnTaskComments } from "../ColumnTaskComments/ui/ColumnTaskComments/ColumnTaskComments";
import { ColumnTaskContributors } from "../ColumnTaskContributors/ColumnTaskContributors";
import { ColumnTaskDeadline } from "../ColumnTaskDeadline/ColumnTaskDeadline";
import { ColumnTaskMiniature } from "../ColumnTaskMiniature/ColumnTaskMiniature";
import { ColumnTaskSubscribeNotifications } from "../ColumnTaskSubscribeNotifications/ColumnTaskSubscribeNotifications";
import { TaskCoverBlock } from "../TaskCoverBlock/TaskCoverBlock";
import { TaskDescription } from "../TaskDescription/TaskDescription";
import { TaskPriority } from "../TaskPriority/TaskPriority";
import { TaskStatus } from "../TaskStatus/TaskStatus";
import { TaskTitle } from "../TaskTitle/TaskTitle";

interface IColumnTaskProps {
  taskData: ITask;
}

export const ColumnTaskDetails = (props: IColumnTaskProps) => {
  const { taskData } = props;

  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = React.useState(false);

  const handleOpenTaskDrawer = () => {
    setIsTaskDrawerOpen(true);
  };

  const handleCloseTaskDrawer = () => {
    setIsTaskDrawerOpen(false);
  };

  const isTaskCoverImage = taskData?.cover?.startsWith("/");
  const isTaskCoverMonoColor = taskData?.cover?.startsWith("#");

  return (
    <TaskDataProvider taskData={taskData}>
      <TaskFormProvider>
        <ColumnTaskMiniature
          handleOpenTaskDrawer={handleOpenTaskDrawer}
          isTaskCoverImage={isTaskCoverImage}
          isTaskCoverMonoColor={isTaskCoverMonoColor}
        />

        <Drawer
          open={isTaskDrawerOpen}
          onClose={handleCloseTaskDrawer}
          size="large"
        >
          {taskData?.cover && (
            <TaskCoverBlock
              isTaskCoverImage={isTaskCoverImage}
              isTaskCoverMonoColor={isTaskCoverMonoColor}
            />
          )}

          <div className={styles.columnTaskDetailsDrawerWrapper}>
            <div className={styles.columnTaskDetailsDrawerInfoWrapper}>
              <TaskTitle />
              <TaskDescription />
              <TaskPriority />
              <TaskStatus />
              <ColumnTaskDeadline />
              <ColumnTaskSubscribeNotifications />
              <ColumnTaskComments />
            </div>

            <div className={styles.columnTaskDetailsDrawerSidebarWrapper}>
              <ColumnTaskAssignedTo />
              <ColumnTaskContributors />
              <ColumnTaskCover
                isTaskCoverImage={isTaskCoverImage}
                isTaskCoverMonoColor={isTaskCoverMonoColor}
              />
              <DeleteColumnTask handleCloseTaskDrawer={handleCloseTaskDrawer} />
            </div>
          </div>
        </Drawer>
      </TaskFormProvider>
    </TaskDataProvider>
  );
};
