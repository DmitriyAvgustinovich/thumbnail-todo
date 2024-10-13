import { Button, Form } from "antd";

import { taskFieldNodes } from "shared/consts/task-field-nodes";
import { taskFieldsDataIndexes } from "shared/consts/task-list-fields";
import { taskStatuses } from "shared/consts/task-statuses";
import { useFormsAddQuery } from "shared/lib/hooks/use-forms-add-query";
import { useGetAuthUser } from "shared/lib/hooks/use-get-auth-user";
import { useGetTaskFields } from "shared/lib/hooks/use-get-task-fields";
import { getCurrentDate } from "shared/lib/utils/get-current-date";
import { ITask } from "shared/types/ITask";

import styles from "./AddTaskForm.module.scss";
import { useAddTaskMutation } from "../../api/add-task-form-api";

interface IAddTaskFormProps {
  projectId: string;
  columnId: string;
  handleCloseAddTaskForm: () => void;
}

export const AddTaskForm = (props: IAddTaskFormProps) => {
  const { projectId, columnId, handleCloseAddTaskForm } = props;

  const { authUser } = useGetAuthUser();

  const { FormFields } = useGetTaskFields({
    taskFormElement: taskFieldsDataIndexes.title,
    taskFormElementNode: taskFieldNodes.input,
    isEdit: false,
  });

  const {
    handleAddEntityFinish,
    handleDeleteEntityFinishFailed,
    isAddEntityLoading,
  } = useFormsAddQuery<ITask>({
    useAddEntityMutation: useAddTaskMutation,
    handleCloseAddForm: handleCloseAddTaskForm,
    successMutationMessage: "Task added successfully",
    additionalParams: {
      fields: {
        projectId,
        columnId,
        createdUserId: authUser?.id,
        assignedToUserId: "",
        status: taskStatuses.notStarted,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
      },
    },
  });

  return (
    <Form
      className={styles.addTaskFormWrapper}
      layout="vertical"
      onFinish={handleAddEntityFinish}
      onFinishFailed={handleDeleteEntityFinishFailed}
    >
      {FormFields}

      <div className={styles.addTaskFormButtonsWrapper}>
        <Button type="primary" htmlType="submit" loading={isAddEntityLoading}>
          Add card
        </Button>

        <Button
          className={styles.addTaskFormCancelButton}
          onClick={handleCloseAddTaskForm}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};
