import React from "react";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ColumnTaskCommentActionsBlock } from "features/columnTaskCommentActions";
import { EditCommentForm } from "features/editCommentForm";

import { useContexts } from "shared/lib/hooks/use-contexts";
import { useGetUserByIdQuery } from "shared/lib/hooks/use-get-user-by-id-query";
import { IComment } from "shared/types/IComment";

import styles from "./ColumnTaskComment.module.scss";

interface IColumnTaskCommentProps {
  commentData: IComment;
  isEditing: boolean;
  handleOpenEditForm: () => void;
  handleCloseEditForm: () => void;
}

export const ColumnTaskComment = (props: IColumnTaskCommentProps) => {
  const { commentData, isEditing, handleOpenEditForm, handleCloseEditForm } =
    props;

  const {
    taskFormContext: { setMarkdownCommentDefaultValue },
  } = useContexts();

  React.useEffect(() => {
    if (isEditing) {
      setMarkdownCommentDefaultValue(commentData.comment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, commentData.comment]);

  const { data: userData } = useGetUserByIdQuery({ id: commentData.authorId });

  return (
    <div className={styles.columnTaskCommentWrapper}>
      {userData?.avatarUrl ? (
        <img
          className={styles.columnTaskCommentUserAvatar}
          src={userData?.avatarUrl}
          alt=""
        />
      ) : (
        <Avatar
          className={styles.columnTaskCommentUserAvatar}
          icon={<UserOutlined />}
        />
      )}

      <div className={styles.columnTaskCommentInfoWrapper}>
        <Typography.Text className={styles.columnTaskCommentUserName} strong>
          {userData?.name} {userData?.surname}
        </Typography.Text>

        <Typography.Text className={styles.columnTaskCommentCreatedAt}>
          {" | "} {commentData.createdAt}
        </Typography.Text>

        <Typography.Text className={styles.columnTaskCommentUpdatedAt}>
          Updated at: <u>{commentData.updatedAt}</u>
        </Typography.Text>

        {!isEditing ? (
          <Markdown
            className={styles.columnTaskCommentTextWrapper}
            remarkPlugins={[remarkGfm]}
          >
            {commentData.comment}
          </Markdown>
        ) : (
          <EditCommentForm
            commentData={commentData}
            handleCloseEditForm={handleCloseEditForm}
          />
        )}

        {!isEditing && (
          <ColumnTaskCommentActionsBlock
            commentData={commentData}
            handleOpenEditForm={handleOpenEditForm}
          />
        )}
      </div>
    </div>
  );
};
