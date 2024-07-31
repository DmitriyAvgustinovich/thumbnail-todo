import React from "react";

import { ClockCircleOutlined, CommentOutlined } from "@ant-design/icons";
import { Tag, Typography } from "antd";

import { useGetCommentsByTaskIdQuery } from "store/api/comments/comments-api";

import { getConvertDate } from "utils/general/get-convert-date";

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

  const { data: commentsData } = useGetCommentsByTaskIdQuery({
    taskId: taskData.id,
  });

  return (
    <>
      <div className={styles.columnTaskWrapper} onClick={handleOpenTaskDrawer}>
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

      <TaskDrawer
        isTaskDrawerOpen={isTaskDrawerOpen}
        handleCloseTaskDrawer={handleCloseTaskDrawer}
        taskData={taskData}
      />
    </>
  );
};
