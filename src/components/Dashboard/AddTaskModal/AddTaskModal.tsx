import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { Button, Form, Modal } from "antd";

import { useAddTaskMutation } from "store/api/tasks/tasks-api";

import { taskStatuses } from "constants/task/task-statuses";

import { useGetTaskFields } from "hooks/dashboard/use-get-task-fields";
import { useContexts } from "hooks/general/use-contexts";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { getValidateMessage } from "utils/auth/get-validate-message";
import { getCurrentDate } from "utils/general/get-current-date";

import { ITask } from "types/ITask";

import styles from "./AddTaskModal.module.scss";

interface IAddTaskModalProps {
  isAddTaskModalOpen: boolean;
  handleCloseAddTaskModal: () => void;
}

export const AddTaskModal = (props: IAddTaskModalProps) => {
  const { isAddTaskModalOpen, handleCloseAddTaskModal } = props;

  const {
    imageUrlContext: { uploadImagePath },
  } = useContexts();

  const { authUser } = useGetAuthUser();
  const { FormFields } = useGetTaskFields({ isEdit: false });

  const [
    addTask,
    {
      isSuccess: isAddTaskSuccess,
      isLoading: isAddTaskLoading,
      status: addTaskStatus,
      error: addTaskError,
    },
  ] = useAddTaskMutation();

  const handleAddTaskFinish = (formValues: ITask) => {
    const addedData = {
      ...formValues,
      id: Date.now(),
      userId: authUser?.id,
      status: taskStatuses.notStarted,
      createdAt: getCurrentDate(),
      image: uploadImagePath,
    };

    addTask(addedData);
    setTimeout(() => handleCloseAddTaskModal(), 1000);
  };

  const handleAddTaskFinishFailed = (error: ValidateErrorEntity) => {
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
      open={isAddTaskModalOpen}
      onCancel={handleCloseAddTaskModal}
      footer={null}
    >
      <Form
        className={styles.addTaskFormWrapper}
        layout="vertical"
        onFinish={handleAddTaskFinish}
        onFinishFailed={handleAddTaskFinishFailed}
      >
        {FormFields}

        <Button type="primary" htmlType="submit" loading={isAddTaskLoading}>
          Done
        </Button>
      </Form>
    </Modal>
  );
};
