import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";

import { MarkdownBlocks, MarkdownPreview } from "entities/Markdown";

import { useContexts } from "shared/lib/hooks/use-contexts";
import { useFormsUpdateQuery } from "shared/lib/hooks/use-forms-update-query";
import { useGetCommentFields } from "shared/lib/hooks/use-get-comment-fields";
import { getCurrentDate } from "shared/lib/utils/get-current-date";
import { IComment } from "shared/types/IComment";

import styles from "./EditCommentForm.module.scss";
import { useUpdateCommentMutation } from "../../api/edit-comment-form-api";


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
    handleDeleteEntityFinishFailed,
    isUpdateEntityLoading,
  } = useFormsUpdateQuery<IComment, IComment>({
    useUpdateQueryMutation: useUpdateCommentMutation,
    handleCloseUpdateForm: handleCloseEditForm,
    entityData: commentData,
    successMutationMessage: "ColumnTaskComment updated successfully",
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
      onFinishFailed={handleDeleteEntityFinishFailed}
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
