import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { Button, Form, Modal } from "antd";

import { useGetTaskFields } from "hooks/dashboard/use-get-task-fields";

import { ITask } from "types/ITask";

interface IEditTaskModalProps {
  isEditTaskModalOpen: boolean;
  handleCloseEditTaskModal: () => void;
  handleUpdateTaskFinish: (formValues: ITask) => void;
  handleAddNewTaskFinishFailed: (error: ValidateErrorEntity) => void;
}

export const EditTaskModal = (props: IEditTaskModalProps) => {
  const {
    isEditTaskModalOpen,
    handleCloseEditTaskModal,
    handleUpdateTaskFinish,
    handleAddNewTaskFinishFailed,
  } = props;

  const { FormFields } = useGetTaskFields();

  return (
    <Modal
      title="Edit Task"
      open={isEditTaskModalOpen}
      onCancel={handleCloseEditTaskModal}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleUpdateTaskFinish}
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
