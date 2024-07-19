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
}

export const Comment = (props: ICommentProps) => {
  const { commentData } = props;

  const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);

  const {
    taskFormContext: { handleSetMarkdownCommentDefaultValue },
  } = useContexts();

  const handleOpenEditForm = () => {
    setIsEditFormVisible(true);
    handleSetMarkdownCommentDefaultValue(commentData.comment);
  };

  const handleCloseEditForm = () => {
    setIsEditFormVisible(false);
  };

  const { data: userData } = useGetUserByIdQuery({ id: commentData.userId });

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

      <div>
        <Typography.Text className={styles.commentUserName} strong>
          {userData?.name} {userData?.surname}
        </Typography.Text>

        <Typography.Text className={styles.commentCreatedAt}>
          {" | "} {commentData.createdAt}
        </Typography.Text>

        <Typography.Text className={styles.commentUpdatedAt} underline>
          Updated at: {commentData.updatedAt}
        </Typography.Text>

        {!isEditFormVisible ? (
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

        {!isEditFormVisible && (
          <CommentActionsBlock
            commentData={commentData}
            handleOpenEditForm={handleOpenEditForm}
          />
        )}
      </div>
    </div>
  );
};
