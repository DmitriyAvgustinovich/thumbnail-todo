import React from "react";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useGetUserByIdQuery } from "store/api/users/users-api";

import { useContexts } from "hooks/general/use-contexts";

import { IComment } from "types/IComment";

import styles from "./Comment.module.scss";
import { CommentActionsBlock } from "./CommentActionsBlock/CommentActionsBlock";
import { EditCommentForm } from "./EditCommentForm/EditCommentForm";

interface ICommentProps {
  commentData: IComment;
  isEditing: boolean;
  handleOpenEditForm: () => void;
  handleCloseEditForm: () => void;
}

export const Comment = (props: ICommentProps) => {
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
    <div className={styles.commentWrapper}>
      {userData?.avatarUrl ? (
        <img
          className={styles.commentUserAvatar}
          src={userData?.avatarUrl}
          alt=""
        />
      ) : (
        <Avatar className={styles.commentUserAvatar} icon={<UserOutlined />} />
      )}

      <div className={styles.commentInfoWrapper}>
        <Typography.Text className={styles.commentUserName} strong>
          {userData?.name} {userData?.surname}
        </Typography.Text>

        <Typography.Text className={styles.commentCreatedAt}>
          {" | "} {commentData.createdAt}
        </Typography.Text>

        <Typography.Text className={styles.commentUpdatedAt}>
          Updated at: <u>{commentData.updatedAt}</u>
        </Typography.Text>

        {!isEditing ? (
          <Markdown
            className={styles.commentTextWrapper}
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
          <CommentActionsBlock
            commentData={commentData}
            handleOpenEditForm={handleOpenEditForm}
          />
        )}
      </div>
    </div>
  );
};
