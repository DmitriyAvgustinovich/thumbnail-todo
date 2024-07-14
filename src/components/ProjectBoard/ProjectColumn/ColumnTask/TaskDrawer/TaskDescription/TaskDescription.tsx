import React from "react";

import { AlignLeftOutlined } from "@ant-design/icons";
import { Form, Tooltip, Typography } from "antd";

import { useUpdateTaskMutation } from "store/api/tasks/tasks-api";

import { taskFieldNodes } from "constants/task/task-field-nodes";
import { taskFieldsDataIndexes } from "constants/task/task-list-fields";

import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";
import { useGetTaskFields } from "hooks/task/use-get-task-fields";

import { ITask } from "types/ITask";

import styles from "./TaskDescription.module.scss";

interface ITaskDescriptionProps {
  taskData: ITask;
}

export const TaskDescription = (props: ITaskDescriptionProps) => {
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
    successMutationMessage: "Task description updated successfully",
  });

  const { FormFields } = useGetTaskFields({
    formValues: taskData,
    taskFormElementHandleCloseEditForm: handleCloseEditForm,
    taskFormElementIsLoadingState: isUpdateEntityLoading,
    taskFormElementNode: taskFieldNodes.input,
    taskFormElement: taskFieldsDataIndexes.description,
    isEdit: true,
  });

  return (
    <>
      <div
        className={styles.taskDescriptionIconWrapper}
        onClick={handleOpenEditForm}
      >
        <AlignLeftOutlined className={styles.taskDescriptionIcon} />
        <Tooltip title="Edit task description" placement="right">
          <Typography.Text className={styles.taskDescriptionIconText}>
            Description
          </Typography.Text>
        </Tooltip>
      </div>

      {!isEditFormVisible ? (
        <Typography.Text className={styles.taskDescriptionText}>
          {taskData.description}
        </Typography.Text>
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
