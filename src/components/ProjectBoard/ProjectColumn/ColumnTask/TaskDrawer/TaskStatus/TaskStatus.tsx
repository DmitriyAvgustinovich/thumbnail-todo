import React from "react";

import {
  CheckOutlined,
  CloseOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import { Button, Form, Tooltip, Typography } from "antd";

import { useUpdateTaskMutation } from "store/api/tasks/tasks-api";

import { taskFieldNodes } from "constants/task/task-field-nodes";
import { taskFieldsDataIndexes } from "constants/task/task-list-fields";

import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";
import { useGetTaskFields } from "hooks/task/use-get-task-fields";

import { getConditionTaskStatusColor } from "utils/dashboard/get-condition-task-status-color";
import { getCurrentDate } from "utils/general/get-current-date";

import { ITask } from "types/ITask";

import styles from "./TaskStatus.module.scss";

interface ITaskStatusProps {
  taskData: ITask;
}

export const TaskStatus = (props: ITaskStatusProps) => {
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
          className={styles.taskStatusFormWrapper}
          layout="vertical"
          onFinish={handleUpdateEntityFinish}
          onFinishFailed={handleMutationEntityFinishFailed}
        >
          {FormFields}

          <Tooltip title="Done">
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdateEntityLoading}
              icon={<CheckOutlined />}
            />
          </Tooltip>

          <Tooltip title="Cancel">
            <Button onClick={handleCloseEditForm} icon={<CloseOutlined />} />
          </Tooltip>
        </Form>
      )}
    </>
  );
};
