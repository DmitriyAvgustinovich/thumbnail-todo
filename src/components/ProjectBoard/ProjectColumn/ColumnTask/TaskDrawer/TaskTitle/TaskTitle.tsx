import React from "react";

import { Form, Tooltip, Typography } from "antd";

import { useUpdateTaskMutation } from "store/api/tasks/tasks-api";

import { taskFieldNodes } from "constants/task/task-field-nodes";
import { taskFieldsDataIndexes } from "constants/task/task-list-fields";

import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";
import { useGetTaskFields } from "hooks/task/use-get-task-fields";

import { ITask } from "types/ITask";

import styles from "./TaskTitle.module.scss";

interface ITaskTitleProps {
  taskData: ITask;
}

export const TaskTitle = (props: ITaskTitleProps) => {
  const { taskData } = props;

  const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);

  const handleOpenEditForm = () => {
    setIsEditFormVisible(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormVisible(false);
  };

  const {
    handleUpdateEntityFinish,
    handleMutationEntityFinishFailed,
    isUpdateEntityLoading,
  } = useFormsUpdateQuery<ITask, ITask>({
    useUpdateQueryMutation: useUpdateTaskMutation,
    handleCloseUpdateForm: handleCloseEditForm,
    entityData: taskData,
    successMutationMessage: "Task title updated successfully",
  });

  const { FormFields } = useGetTaskFields({
    formValues: taskData,
    taskFormElementHandleCloseEditForm: handleCloseEditForm,
    taskFormElementIsLoadingState: isUpdateEntityLoading,
    taskFormElementNode: taskFieldNodes.input,
    taskFormElement: taskFieldsDataIndexes.title,
    isEdit: true,
  });

  return (
    <>
      {!isEditFormVisible ? (
        <Tooltip title="Edit task title">
          <Typography.Text
            className={styles.taskTitle}
            onClick={handleOpenEditForm}
          >
            {taskData.title}
          </Typography.Text>
        </Tooltip>
      ) : (
        <Form
          layout="vertical"
          onFinish={handleUpdateEntityFinish}
          onFinishFailed={handleMutationEntityFinishFailed}
        >
          {FormFields}
        </Form>
      )}
    </>
  );
};
