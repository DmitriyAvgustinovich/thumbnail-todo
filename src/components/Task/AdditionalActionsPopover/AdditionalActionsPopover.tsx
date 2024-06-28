import React from "react";

import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Form, Modal, Popconfirm, Popover, Typography } from "antd";

import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "store/api/tasks/tasks-api";

import { useGetTaskFields } from "hooks/dashboard/use-get-task-fields";
import { useGetImageUrl } from "hooks/general/use-get-image-url";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

import { getValidateMessage } from "utils/auth/get-validate-message";

import { ITask } from "types/ITask";

import styles from "./AdditionalActionsPopover.module.scss";

interface IAdditionalActionsPopoverProps {
  taskData: ITask;
}

export const AdditionalActionsPopover = (
  props: IAdditionalActionsPopoverProps
) => {
  const { taskData } = props;

  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = React.useState(false);

  const { uploadImagePath } = useGetImageUrl();
  const { FormFields } = useGetTaskFields({
    formValues: taskData,
    isEdit: true,
  });

  const [
    updateTask,
    {
      isSuccess: isUpdateTaskSuccess,
      isLoading: isUpdateTaskLoading,
      status: updateTaskStatus,
      error: updateTaskError,
    },
  ] = useUpdateTaskMutation();

  const [
    deleteTask,
    {
      isSuccess: isDeleteTaskSuccess,
      isLoading: isDeleteTaskLoading,
      status: deleteTaskStatus,
      error: deleteTaskError,
    },
  ] = useDeleteTaskMutation();

  const handleUpdateTaskFinish = (formValues: ITask) => {
    const updatedData = {
      ...formValues,
      id: taskData.id,
      image: uploadImagePath,
    };

    updateTask(updatedData);
    setTimeout(() => handleCloseEditTaskModal(), 1500);
  };

  const handleAddNewTaskFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  const handleDeleteTask = () => {
    deleteTask({ id: taskData.id });
  };

  useGetQueryMessages({
    isSuccess: isDeleteTaskSuccess,
    isLoading: isDeleteTaskLoading,
    status: deleteTaskStatus,
    error: deleteTaskError,
    successMessage: "Task deleted.",
  });

  useGetQueryMessages({
    isSuccess: isUpdateTaskSuccess,
    isLoading: isUpdateTaskLoading,
    status: updateTaskStatus,
    error: updateTaskError,
    successMessage: "Task updated.",
  });

  const handleOpenEditTaskModal = () => {
    setIsEditTaskModalOpen(true);
  };

  const handleCloseEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
  };

  const popoverContent = (
    <>
      <div
        className={styles.taskAdditionalActionWrapper}
        onClick={handleOpenEditTaskModal}
      >
        <EditOutlined className={styles.taskAdditionalActionIcon} />
        <Typography.Text className={styles.taskAdditionalActionText}>
          Edit task
        </Typography.Text>
      </div>

      <Popconfirm
        title="Are you sure you want to delete this task?"
        onConfirm={handleDeleteTask}
      >
        <div className={styles.taskAdditionalActionWrapper}>
          <DeleteOutlined className={styles.taskAdditionalActionIcon} />
          <Typography.Text className={styles.taskAdditionalActionText}>
            Delete task
          </Typography.Text>
        </div>
      </Popconfirm>
    </>
  );

  return (
    <>
      <Popover content={popoverContent} placement="bottom">
        <EllipsisOutlined className={styles.taskAdditionalActionsIcon} />
      </Popover>

      <Modal
        title="Edit Task"
        open={isEditTaskModalOpen}
        onCancel={handleCloseEditTaskModal}
        footer={null}
      >
        <Form
          className={styles.editTaskModalForm}
          layout="vertical"
          onFinish={handleUpdateTaskFinish}
          onFinishFailed={handleAddNewTaskFinishFailed}
        >
          {FormFields}

          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdateTaskLoading}
          >
            Done
          </Button>
        </Form>
      </Modal>
    </>
  );
};
