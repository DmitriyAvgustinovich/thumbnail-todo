import { LoadingOutlined } from "@ant-design/icons";
import { Popconfirm, Spin, Typography } from "antd";

import { useDeleteEntityQuery } from "shared/lib/hooks/use-delete-entity-query";
import { IComment } from "shared/types/IComment";

import styles from "./ColumnTaskCommentActionsBlock.module.scss";
import { useDeleteCommentMutation } from "../../api/column-task-comment-api";

interface ICommentActionsBlockProps {
  commentData: IComment;
  handleOpenEditForm: () => void;
}

export const ColumnTaskCommentActionsBlock = (
  props: ICommentActionsBlockProps
) => {
  const { commentData, handleOpenEditForm } = props;

  const { handleDeleteEntityFinish, isDeleteEntityLoading } =
    useDeleteEntityQuery({
      useDeleteQueryMutation: useDeleteCommentMutation,
      entityDataIdField: "id",
      entityDataId: commentData?.id ?? "",
      successMutationMessage: "ColumnTaskComment deleted successfully",
    });

  return (
    <div className={styles.columnTaskCommentActionsBlockWrapper}>
      <Typography.Text
        className={styles.columnTaskCommentActionsBlockText}
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
              className={
                styles.columnTaskCommentActionsBlockDeleteStatusSpinner
              }
              indicator={<LoadingOutlined spin />}
              size="small"
            />
          )}

          <Typography.Text
            className={styles.columnTaskCommentActionsBlockText}
            underline
          >
            Delete
          </Typography.Text>
        </>
      </Popconfirm>
    </div>
  );
};
