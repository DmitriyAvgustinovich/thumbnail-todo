import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";

import { MarkdownBlocks } from "components/MarkdownPreview/MarkdownBlocks/MarkdownBlocks";
import { MarkdownPreview } from "components/MarkdownPreview/MarkdownPreview";

import { useUpdateCommentMutation } from "store/api/comments/comments-api";

import { useGetCommentFields } from "hooks/comments/use-get-comment-fields";
import { useContexts } from "hooks/general/use-contexts";
import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";

import { getCurrentDate } from "utils/general/get-current-date";

import { IComment } from "types/IComment";

import styles from "./EditCommentForm.module.scss";

interface IEditCommentFormProps {
  commentData: IComment;
  handleCloseEditForm: () => void;
}

export const EditCommentForm = (props: IEditCommentFormProps) => {
  const { commentData, handleCloseEditForm } = props;

  const {
    taskFormContext: { markdownCommentValue },
  } = useContexts();

  const {
    handleUpdateEntityFinish,
    handleMutationEntityFinishFailed,
    isUpdateEntityLoading,
  } = useFormsUpdateQuery<IComment, IComment>({
    useUpdateQueryMutation: useUpdateCommentMutation,
    handleCloseUpdateForm: handleCloseEditForm,
    entityData: commentData,
    successMutationMessage: "Comment updated successfully",
    additionalParams: {
      fields: {
        updatedAt: getCurrentDate(),
      },
    },
  });

  const { FormFields } = useGetCommentFields({
    formValues: commentData,
  });

  return (
    <Form
      className={styles.editCommentFormWrapper}
      layout="vertical"
      onFinish={handleUpdateEntityFinish}
      onFinishFailed={handleMutationEntityFinishFailed}
    >
      {FormFields}
      <MarkdownBlocks />

      <MarkdownPreview markdownValue={markdownCommentValue} />

      <div className={styles.editCommentFormButtonsWrapper}>
        <Tooltip title="Done">
          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdateEntityLoading}
            icon={<CheckOutlined />}
          />
        </Tooltip>

        <Tooltip title="Cancel">
          <Button onClick={handleCloseEditForm} icon={<CloseOutlined />} />
        </Tooltip>
      </div>
    </Form>
  );
};
