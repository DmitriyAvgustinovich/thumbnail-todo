import React from "react";

import { SlidersOutlined } from "@ant-design/icons";
import { Form, Tooltip, Typography } from "antd";

import { taskFieldNodes } from "shared/consts/task-field-nodes";
import { taskFieldsDataIndexes } from "shared/consts/task-list-fields";
import { useContexts } from "shared/lib/hooks/use-contexts";
import { useFormsUpdateQuery } from "shared/lib/hooks/use-forms-update-query";
import { useGetTaskFields } from "shared/lib/hooks/use-get-task-fields";
import { useUpdateTaskMutation } from "shared/lib/hooks/use-update-task-mutation";
import { getConditionTaskStatusColor } from "shared/lib/utils/get-condition-task-status-color";
import { getCurrentDate } from "shared/lib/utils/get-current-date";
import { ITask } from "shared/types/ITask";

import styles from "./TaskStatus.module.scss";

export const TaskStatus = () => {
  const { taskDataContext: taskData } = useContexts();

  const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);

  const handleOpenEditForm = () => {
    setIsEditFormVisible(!isEditFormVisible);
  };

  const handleCloseEditForm = () => {
    setIsEditFormVisible(false);
  };

  const {
    handleUpdateEntityFinish,
    handleDeleteEntityFinishFailed,
    isUpdateEntityLoading,
  } = useFormsUpdateQuery<ITask, ITask>({
    useUpdateQueryMutation: useUpdateTaskMutation,
    handleCloseUpdateForm: handleCloseEditForm,
    entityData: taskData,
    successMutationMessage: "Task status updated successfully",
    additionalParams: {
      fields: {
        updatedAt: getCurrentDate(),
      },
    },
  });

  const { FormFields } = useGetTaskFields({
    formValues: taskData,
    taskFormElementHandleCloseEditForm: handleCloseEditForm,
    taskFormElementIsLoadingState: isUpdateEntityLoading,
    taskFormElementNode: taskFieldNodes.select,
    taskFormElement: taskFieldsDataIndexes.status,
    isEdit: true,
  });

  const taskStatusStyles = {
    color: getConditionTaskStatusColor(taskData.status),
  };

  return (
    <>
      <div
        className={styles.taskStatusIconWrapper}
        onClick={handleOpenEditForm}
      >
        <SlidersOutlined className={styles.taskStatusIcon} />
        <Tooltip title="Edit task status" placement="right">
          <Typography.Text className={styles.taskStatusIconText}>
            Status
          </Typography.Text>
        </Tooltip>
      </div>

      {!isEditFormVisible ? (
        <Typography.Text
          className={styles.taskStatusText}
          strong
          style={taskStatusStyles}
        >
          {taskData.status}
        </Typography.Text>
      ) : (
        <Form
          layout="vertical"
          onValuesChange={handleUpdateEntityFinish}
          onFinishFailed={handleDeleteEntityFinishFailed}
        >
          {FormFields}
        </Form>
      )}
    </>
  );
};
