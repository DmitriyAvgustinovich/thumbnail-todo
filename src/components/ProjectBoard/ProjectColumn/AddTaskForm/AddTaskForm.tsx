import { Button, Form } from "antd";

import { useAddTaskMutation } from "store/api/tasks/tasks-api";

import { taskFieldNodes } from "constants/task/task-field-nodes";
import { taskFieldsDataIndexes } from "constants/task/task-list-fields";
import { taskStatuses } from "constants/task/task-statuses";

import { useContexts } from "hooks/general/use-contexts";
import { useFormsAddQuery } from "hooks/general/use-forms-add-query";
import { useGetTaskFields } from "hooks/task/use-get-task-fields";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { getCurrentDate } from "utils/general/get-current-date";

import { ITask } from "types/ITask";

import styles from "./AddTaskForm.module.scss";

interface IAddTaskFormProps {
  projectId: string;
  columnId: string;
}

export const AddTaskForm = (props: IAddTaskFormProps) => {
  const { projectId, columnId } = props;

  const { authUser } = useGetAuthUser();

  const {
    taskFormContext: { handleCloseAddTaskForm },
  } = useContexts();

  const { FormFields } = useGetTaskFields({
    taskFormElement: taskFieldsDataIndexes.title,
    taskFormElementNode: taskFieldNodes.input,
    isEdit: false,
  });

  const {
    handleAddEntityFinish,
    handleMutationEntityFinishFailed,
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
        status: taskStatuses.notStarted,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
      },
    },
  });

  return (
    <Form
      className={styles.addTaskForm}
      layout="vertical"
      onFinish={handleAddEntityFinish}
      onFinishFailed={handleMutationEntityFinishFailed}
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
