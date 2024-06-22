import React from "react";

import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { Button } from "antd";

import { EditTaskModal } from "components/Dashboard/EditTaskModal/EditTaskModal";

import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "store/api/tasks/tasks-api";

import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

import { getValidateMessage } from "utils/auth/get-validate-message";

import { ITask } from "types/ITask";
import { TObjWithStringValues } from "types/TObjWithStringValues";

interface IUseGetEditAndDeleteTaskButtonsArgs {
  taskId: number;
  styles: TObjWithStringValues;
}

export const useGetEditAndDeleteTaskButtons = (
  args: IUseGetEditAndDeleteTaskButtonsArgs
) => {
  const { taskId, styles } = args;

  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = React.useState(false);

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
    updateTask({ ...formValues, id: taskId });
  };

  const handleAddNewTaskFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  const handleDeleteTask = () => {
    deleteTask({ id: taskId });
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

  const EditAndDeleteTaskButtons = (
    <>
      <Button onClick={handleOpenEditTaskModal}>Edit Task</Button>

      <Button onClick={handleDeleteTask} loading={isDeleteTaskLoading}>
        Delete Task
      </Button>

      <EditTaskModal
        isEditTaskModalOpen={isEditTaskModalOpen}
        handleCloseEditTaskModal={handleCloseEditTaskModal}
        handleUpdateTaskFinish={handleUpdateTaskFinish}
        handleAddNewTaskFinishFailed={handleAddNewTaskFinishFailed}
      />
    </>
  );

  return { EditAndDeleteTaskButtons };
};
