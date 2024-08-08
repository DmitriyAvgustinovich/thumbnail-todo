import React from "react";

import { ClockCircleOutlined, CommentOutlined } from "@ant-design/icons";
import { Drawer, Tag, Typography } from "antd";

import { useGetCommentsByTaskIdQuery } from "store/api/comments/comments-api";

import { getConvertDate } from "utils/general/get-convert-date";

import { ITask } from "types/ITask";

import styles from "./ColumnTask.module.scss";
import { TaskComments } from "./TaskComments/TaskComments";
import { TaskDeadline } from "./TaskDeadline/TaskDeadline";
import { TaskDescription } from "./TaskDescription/TaskDescription";
import { SidebarAssignedToAction } from "./TaskDrawerSidebar/SidebarAssignedToAction/SidebarAssignedToAction";
import { SidebarCoverAction } from "./TaskDrawerSidebar/SidebarCoverAction/SidebarCoverAction";
import { SidebarDeleteTaskAction } from "./TaskDrawerSidebar/SidebarDeleteTaskAction/SidebarDeleteTaskAction";
import { SidebarTaskContributorsAction } from "./TaskDrawerSidebar/SidebarTaskContributorsAction/SidebarTaskContributorsAction";
import { TaskPriority } from "./TaskPriority/TaskPriority";
import { TaskStatus } from "./TaskStatus/TaskStatus";
import { TaskSubscribeNotifications } from "./TaskSubscribeNotifications/TaskSubscribeNotifications";
import { TaskTitle } from "./TaskTitle/TaskTitle";

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

  const { data: commentsData } = useGetCommentsByTaskIdQuery({
    taskId: taskData.id,
  });

  const TaskCover = React.useMemo(() => {
    if (taskData?.cover?.startsWith("/")) {
      return (
        <img
          className={styles.columnTaskDrawerCover}
          src={taskData?.cover}
          alt=""
        />
      );
    } else if (taskData?.cover?.startsWith("#")) {
      return (
        <div
          className={styles.columnTaskDrawerCover}
          style={{ backgroundColor: taskData.cover }}
        />
      );
    } else {
      return <></>;
    }
  }, [taskData]);

  return (
    <>
      <div className={styles.columnTaskWrapper} onClick={handleOpenTaskDrawer}>
        {taskData?.cover && TaskCover}

        <Typography.Text className={styles.columnTaskTitle}>
          {taskData?.title}
        </Typography.Text>

        <div>
          {taskData?.deadline && (
            <Tag>
              <ClockCircleOutlined /> {getConvertDate(taskData?.deadline)}
            </Tag>
          )}

          {!!commentsData?.length && (
            <Tag>
              <CommentOutlined className={styles.columnTaskCommentsIcon} />
              {commentsData?.length}
            </Tag>
          )}
        </div>
      </div>

      <Drawer
        open={isTaskDrawerOpen}
        onClose={handleCloseTaskDrawer}
        size="large"
      >
        {taskData?.cover && TaskCover}

        <div className={styles.columnTaskDrawerWrapper}>
          <div className={styles.columnTaskDrawerInfoWrapper}>
            <TaskTitle taskData={taskData} />
            <TaskDescription taskData={taskData} />
            <TaskPriority taskData={taskData} />
            <TaskStatus taskData={taskData} />
            <TaskDeadline taskData={taskData} />
            <TaskSubscribeNotifications />
            <TaskComments taskData={taskData} />
          </div>

          <div className={styles.columnTaskDrawerSidebarWrapper}>
            <SidebarAssignedToAction taskData={taskData} />
            <SidebarTaskContributorsAction taskData={taskData} />
            <SidebarCoverAction taskData={taskData} />
            <SidebarDeleteTaskAction
              taskData={taskData}
              handleCloseTaskDrawer={handleCloseTaskDrawer}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};
