import React from "react";

import { CommentOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import { useGetCommentsByTaskIdQuery } from "store/api/comments/comments-api";

import { ITask } from "types/ITask";

import { AddCommentForm } from "./AddCommentForm/AddCommentForm";
import { Comment } from "./Comment/Comment";
import styles from "./TaskComments.module.scss";
import { WriteCommentBlock } from "./WriteCommentBlock/WriteCommentBlock";

interface ITaskCommentsProps {
  taskData: ITask;
}

export const TaskComments = (props: ITaskCommentsProps) => {
  const { taskData } = props;

  const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);

  const { data: commentsData } = useGetCommentsByTaskIdQuery({
    taskId: taskData.id,
  });

  const handleOpenEditForm = () => {
    setIsEditFormVisible(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormVisible(false);
  };

  return (
    <>
      <div className={styles.taskCommentsIconWrapper}>
        <CommentOutlined className={styles.taskCommentsIcon} />
        <Typography.Text className={styles.taskCommentsIconText}>
          Comments
        </Typography.Text>
      </div>

      {commentsData?.map((comment) => (
        <Comment key={comment.id} commentData={comment} />
      ))}

      {isEditFormVisible && (
        <AddCommentForm
          taskData={taskData}
          handleCloseEditForm={handleCloseEditForm}
        />
      )}

      {!isEditFormVisible && (
        <WriteCommentBlock handleOpenEditForm={handleOpenEditForm} />
      )}
    </>
  );
};
