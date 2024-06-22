import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { Button, Form, Modal } from "antd";

import { useAddTaskMutation } from "store/api/tasks/tasks-api";

import { taskStatuses } from "constants/dashboard/task-statuses";

import { useGetTaskFields } from "hooks/dashboard/use-get-task-fields";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { getValidateMessage } from "utils/auth/get-validate-message";
import { getCurrentDate } from "utils/general/get-current-date";

import { ITask } from "types/ITask";

interface IAddTaskModalProps {
  isAddNewTaskModalOpen: boolean;
  handleCloseAddNewTaskModal: () => void;
}

export const AddTaskModal = (props: IAddTaskModalProps) => {
  const { isAddNewTaskModalOpen, handleCloseAddNewTaskModal } = props;

  const { authUser } = useGetAuthUser();

  const { FormFields } = useGetTaskFields();

  const [
    addTask,
    {
      isSuccess: isAddTaskSuccess,
      isLoading: isAddTaskLoading,
      status: addTaskStatus,
      error: addTaskError,
    },
  ] = useAddTaskMutation();

  const handleAddNewTaskFinish = (formValues: ITask) => {
    const addedData = {
      ...formValues,
      id: Date.now(),
      userId: authUser?.id,
      status: taskStatuses.notStarted,
      createdAt: getCurrentDate(),
    };

    addTask(addedData);
    setTimeout(() => handleCloseAddNewTaskModal(), 1500);
  };

  const handleAddNewTaskFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  useGetQueryMessages({
    isSuccess: isAddTaskSuccess,
    isLoading: isAddTaskLoading,
    status: addTaskStatus,
    error: addTaskError,
    successMessage: "Task has been added.",
  });

  return (
    <Modal
      title="Add New Task"
      open={isAddNewTaskModalOpen}
      onCancel={handleCloseAddNewTaskModal}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleAddNewTaskFinish}
        onFinishFailed={handleAddNewTaskFinishFailed}
      >
        {FormFields}

        <Button type="primary" htmlType="submit">
          Done
        </Button>
      </Form>
    </Modal>
  );
};
