import { CheckOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Tooltip } from "antd";

import { MarkdownBlocks } from "components/MarkdownPreview/MarkdownBlocks/MarkdownBlocks";
import { MarkdownPreview } from "components/MarkdownPreview/MarkdownPreview";

import { useGetColumnByIdQuery } from "store/api/columns/columns-api";
import { useAddCommentMutation } from "store/api/comments/comments-api";
import { useGetProjectByIdQuery } from "store/api/projects/projects-api";

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
  handleAddFormNotVisible: () => void;
}

export const AddCommentForm = (props: IAddCommentFormProps) => {
  const { taskData, handleAddFormNotVisible } = props;

  const {
    taskFormContext: { markdownCommentValue },
  } = useContexts();

  const { authUser } = useGetAuthUser();

  const { data: columnData } = useGetColumnByIdQuery({ id: taskData.columnId });
  const { data: projectData } = useGetProjectByIdQuery({
    id: taskData?.projectId,
  });

  const timeoutCloseAddProjectModal = () => {
    setTimeout(() => handleAddFormNotVisible(), 1000);
  };

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
        authorId: authUser?.id,
        columnId: columnData?.id,
        projectId: projectData?.id,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
      },
    },
  });

  const { FormFields } = useGetCommentFields({});

  return (
    <div className={styles.addCommentFormWrapper}>
      {authUser?.avatarUrl ? (
        <img
          className={styles.addCommentFormUserAvatar}
          src={authUser?.avatarUrl}
          alt=""
        />
      ) : (
        <Avatar
          className={styles.addCommentFormUserAvatar}
          icon={<UserOutlined />}
        />
      )}

      <Form
        className={styles.addCommentForm}
        layout="vertical"
        onFinish={handleAddEntityFinish}
        onFinishFailed={handleMutationEntityFinishFailed}
      >
        {FormFields}
        <MarkdownBlocks />

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
            <Button
              onClick={handleAddFormNotVisible}
              icon={<CloseOutlined />}
            />
          </Tooltip>
        </div>
      </Form>
    </div>
  );
};
