import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";

import { MarkdownBlocks } from "components/MarkdownPreview/MarkdownBlocks/MarkdownBlocks";
import { MarkdownPreview } from "components/MarkdownPreview/MarkdownPreview";

import { useAddCommentMutation } from "store/api/comments/comments-api";

import { useGetCommentFields } from "hooks/comments/use-get-comment-fields";
import { useContexts } from "hooks/general/use-contexts";
import { useFormsAddQuery } from "hooks/general/use-forms-add-query";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { getCurrentDate } from "utils/general/get-current-date";

import { IComment } from "types/IComment";
import { ITask } from "types/ITask";

import styles from "./AddCommentForm.module.scss";

interface IAddCommentFormProps {
  taskData: ITask;
  handleCloseEditForm: () => void;
}

export const AddCommentForm = (props: IAddCommentFormProps) => {
  const { taskData, handleCloseEditForm } = props;

  const timeoutCloseAddProjectModal = () => {
    setTimeout(() => handleCloseEditForm(), 1000);
  };

  const {
    taskFormContext: { markdownCommentValue },
  } = useContexts();

  const { authUser } = useGetAuthUser();

  const {
    handleAddEntityFinish,
    handleMutationEntityFinishFailed,
    isAddEntityLoading,
  } = useFormsAddQuery<IComment>({
    useAddEntityMutation: useAddCommentMutation,
    handleCloseAddForm: timeoutCloseAddProjectModal,
    successMutationMessage: "Comment added successfully",
    additionalParams: {
      fields: {
        taskId: taskData.id,
        userId: authUser?.id,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
      },
    },
  });

  const { FormFields } = useGetCommentFields({});

  return (
    <Form
      layout="vertical"
      onFinish={handleAddEntityFinish}
      onFinishFailed={handleMutationEntityFinishFailed}
    >
      <div className={styles.addCommentFormWrapper}>
        <MarkdownBlocks />
        {FormFields}
      </div>

      <MarkdownPreview markdownValue={markdownCommentValue} />

      <div className={styles.addCommentFormButtonsWrapper}>
        <Tooltip title="Done">
          <Button
            type="primary"
            htmlType="submit"
            loading={isAddEntityLoading}
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
