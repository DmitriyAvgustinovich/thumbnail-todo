import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { Button, Form, Modal } from "antd";

import { useAddTaskMutation } from "store/api/tasks/tasks-api";

import { useGetAddTaskFields } from "hooks/dashboard/use-get-add-task-fields";

import { getValidateMessage } from "utils/auth/get-validate-message";

interface IAddTaskModalProps {
  isAddNewTaskModalOpen: boolean;
  handleCloseAddNewTaskModal: () => void;
}

export const AddTaskModal = (props: IAddTaskModalProps) => {
  const { isAddNewTaskModalOpen, handleCloseAddNewTaskModal } = props;

  const { FormFields } = useGetAddTaskFields();

  const [addTask] = useAddTaskMutation();

  const handleAddNewTaskFinish = () => {};

  const handleAddNewTaskFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

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
