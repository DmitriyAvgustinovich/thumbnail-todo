import React from "react";

import { CommentOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import { AddCommentForm } from "features/addCommentForm";

import { useContexts } from "shared/lib/hooks/use-contexts";

import styles from "./ColumnTaskComments.module.scss";
import { ColumnTaskCommentsSkeleton } from "./ColumnTaskCommentsSkeleton";
import { useGetCommentsByTaskIdQuery } from "../../../../api/column-task-api";
import { WriteCommentBlock } from "../../../WriteCommentBlock/WriteCommentBlock";
import { ColumnTaskComment } from "../ColumnTaskComment/ColumnTaskComment";

export const ColumnTaskComments = () => {
  const [isAddFormVisible, setIsAddFormVisible] = React.useState(false);
  const [editingCommentId, setEditingCommentId] = React.useState("");

  const {
    taskFormContext: { setMarkdownCommentDefaultValue },
    taskDataContext: taskData,
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
      <div className={styles.columnTaskCommentsIconWrapper}>
        <CommentOutlined className={styles.columnTaskCommentsIcon} />
        <Typography.Text className={styles.columnTaskCommentsIconText}>
          Comments
        </Typography.Text>
      </div>

      {isCommentsDataLoading ? (
        <ColumnTaskCommentsSkeleton />
      ) : (
        commentsData?.map((comment) => (
          <ColumnTaskComment
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
