import { LoadingOutlined } from "@ant-design/icons";
import { Popconfirm, Spin, Typography } from "antd";

import { useDeleteCommentMutation } from "store/api/comments/comments-api";

import { useDeleteEntityQuery } from "hooks/general/use-delete-entity-query";

import { IComment } from "types/IComment";

import styles from "./CommentActionsBlock.module.scss";

interface ICommentActionsBlockProps {
  commentData: IComment;
  handleOpenEditForm: () => void;
}

export const CommentActionsBlock = (props: ICommentActionsBlockProps) => {
  const { commentData, handleOpenEditForm } = props;

  const { handleDeleteEntityFinish, isDeleteEntityLoading } =
    useDeleteEntityQuery<IComment>({
      useDeleteQueryMutation: useDeleteCommentMutation,
      entityData: commentData,
      successMutationMessage: "Comment deleted successfully",
    });

  return (
    <div className={styles.commentActionsBlockWrapper}>
      <Typography.Text
        className={styles.commentActionsBlockText}
        underline
        onClick={handleOpenEditForm}
      >
        Update
      </Typography.Text>
      {" • "}
      <Popconfirm
        title="Are you sure you want to delete this comment?"
        onConfirm={handleDeleteEntityFinish}
      >
        <>
          {isDeleteEntityLoading && (
            <Spin
              className={styles.commentActionsBlockDeleteStatusSpinner}
              indicator={<LoadingOutlined spin />}
              size="small"
            />
          )}

          <Typography.Text className={styles.commentActionsBlockText} underline>
            Delete
          </Typography.Text>
        </>
      </Popconfirm>
    </div>
  );
};
