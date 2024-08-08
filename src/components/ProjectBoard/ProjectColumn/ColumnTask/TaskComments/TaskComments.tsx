import React from "react";

import { CommentOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import { useGetCommentsByTaskIdQuery } from "store/api/comments/comments-api";

import { useContexts } from "hooks/general/use-contexts";

import { ITask } from "types/ITask";

import { AddCommentForm } from "./AddCommentForm/AddCommentForm";
import { Comment } from "./Comment/Comment";
import styles from "./TaskComments.module.scss";
import { TaskCommentsSkeleton } from "./TaskCommentsSkeleton/TaskCommentsSkeleton";
import { WriteCommentBlock } from "./WriteCommentBlock/WriteCommentBlock";

interface ITaskCommentsProps {
  taskData: ITask;
}

export const TaskComments = (props: ITaskCommentsProps) => {
  const { taskData } = props;

  const [isAddFormVisible, setIsAddFormVisible] = React.useState(false);
  const [editingCommentId, setEditingCommentId] = React.useState("");

  const {
    taskFormContext: { setMarkdownCommentDefaultValue },
  } = useContexts();

  const { data: commentsData, isLoading: isCommentsDataLoading } =
    useGetCommentsByTaskIdQuery({
      taskId: taskData.id,
    });

  const handleAddFormVisible = () => {
    setIsAddFormVisible(true);
    setMarkdownCommentDefaultValue("");
    setEditingCommentId("");
  };

  const handleAddFormNotVisible = () => {
    setIsAddFormVisible(false);
  };

  const handleOpenEditForm = (commentId: string) => {
    setEditingCommentId(commentId);
  };

  const handleCloseEditForm = () => {
    setEditingCommentId("");
  };

  return (
    <>
      <div className={styles.taskCommentsIconWrapper}>
        <CommentOutlined className={styles.taskCommentsIcon} />
        <Typography.Text className={styles.taskCommentsIconText}>
          Comments
        </Typography.Text>
      </div>

      {isCommentsDataLoading ? (
        <TaskCommentsSkeleton />
      ) : (
        commentsData?.map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            isEditing={editingCommentId === comment.id}
            handleOpenEditForm={() => handleOpenEditForm(comment.id)}
            handleCloseEditForm={handleCloseEditForm}
          />
        ))
      )}

      {isAddFormVisible && (
        <AddCommentForm
          taskData={taskData}
          handleAddFormNotVisible={handleAddFormNotVisible}
        />
      )}

      {!isAddFormVisible && (
        <WriteCommentBlock handleAddFormVisible={handleAddFormVisible} />
      )}
    </>
  );
};
