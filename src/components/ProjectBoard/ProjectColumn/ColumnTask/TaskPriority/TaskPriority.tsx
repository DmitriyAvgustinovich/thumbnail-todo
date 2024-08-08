import React from "react";

import {
  CheckOutlined,
  CloseOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Button, Form, Tooltip, Typography } from "antd";

import { useUpdateTaskMutation } from "store/api/tasks/tasks-api";

import { taskFieldNodes } from "constants/task/task-field-nodes";
import { taskFieldsDataIndexes } from "constants/task/task-list-fields";

import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";
import { useGetTaskFields } from "hooks/task/use-get-task-fields";

import { getConditionTaskPriorityColor } from "utils/dashboard/get-condition-task-priority-color";
import { getCurrentDate } from "utils/general/get-current-date";

import { ITask } from "types/ITask";

import styles from "./TaskPriority.module.scss";

interface ITaskPriorityProps {
  taskData: ITask;
}

export const TaskPriority = (props: ITaskPriorityProps) => {
  const { taskData } = props;

  const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);

  const handleOpenEditForm = () => {
    setIsEditFormVisible(!isEditFormVisible);
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
    successMutationMessage: "Task priority updated successfully",
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
    taskFormElement: taskFieldsDataIndexes.priority,
    isEdit: true,
  });

  const taskPriorityStyles = {
    color: getConditionTaskPriorityColor(taskData.priority),
  };

  return (
    <>
      <div
        className={styles.taskPriorityIconWrapper}
        onClick={handleOpenEditForm}
      >
        <LineChartOutlined className={styles.taskPriorityIcon} />
        <Tooltip title="Edit task priority" placement="right">
          <Typography.Text className={styles.taskPriorityIconText}>
            Priority
          </Typography.Text>
        </Tooltip>
      </div>

      {!isEditFormVisible ? (
        <Typography.Text
          className={styles.taskPriorityText}
          strong
          style={taskPriorityStyles}
        >
          {taskData.priority}
        </Typography.Text>
      ) : (
        <Form
          className={styles.taskPriorityFormWrapper}
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
              size="large"
            />
          </Tooltip>

          <Tooltip title="Cancel">
            <Button
              onClick={handleCloseEditForm}
              icon={<CloseOutlined />}
              size="large"
            />
          </Tooltip>
        </Form>
      )}
    </>
  );
};
