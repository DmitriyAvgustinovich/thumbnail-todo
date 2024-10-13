import { CheckOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Tooltip } from "antd";

import { MarkdownBlocks, MarkdownPreview } from "entities/Markdown";

import { useContexts } from "shared/lib/hooks/use-contexts";
import { useFormsAddQuery } from "shared/lib/hooks/use-forms-add-query";
import { useGetAuthUser } from "shared/lib/hooks/use-get-auth-user";
import { useGetColumnByIdQuery } from "shared/lib/hooks/use-get-column-by-id-query";
import { useGetCommentFields } from "shared/lib/hooks/use-get-comment-fields";
import { useGetProjectByIdQuery } from "shared/lib/hooks/use-get-project-by-id-query";
import { getCurrentDate } from "shared/lib/utils/get-current-date";
import { IComment } from "shared/types/IComment";
import { ITask } from "shared/types/ITask";

import styles from "./AddCommentForm.module.scss";
import { useAddCommentMutation } from "../../api/add-comment-form-api";

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
    handleDeleteEntityFinishFailed,
    isAddEntityLoading,
  } = useFormsAddQuery<IComment>({
    useAddEntityMutation: useAddCommentMutation,
    handleCloseAddForm: timeoutCloseAddProjectModal,
    successMutationMessage: "ColumnTaskComment added successfully",
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
        onFinishFailed={handleDeleteEntityFinishFailed}
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
