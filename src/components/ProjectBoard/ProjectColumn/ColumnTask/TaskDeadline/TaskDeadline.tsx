import React from "react";

import {
  CheckOutlined,
  CloseOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Button, Form, Tooltip, Typography } from "antd";

import { useUpdateTaskMutation } from "store/api/tasks/tasks-api";

import { taskFieldNodes } from "constants/task/task-field-nodes";
import { taskFieldsDataIndexes } from "constants/task/task-list-fields";

import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";
import { useGetTaskFields } from "hooks/task/use-get-task-fields";

import { getConvertDate } from "utils/general/get-convert-date";
import { getCurrentDate } from "utils/general/get-current-date";

import { ITask } from "types/ITask";

import styles from "./TaskDeadline.module.scss";

interface ITaskDeadlineProps {
  taskData: ITask;
}

export const TaskDeadline = (props: ITaskDeadlineProps) => {
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
    successMutationMessage: "Task deadline updated successfully",
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
    taskFormElementNode: taskFieldNodes.date,
    taskFormElement: taskFieldsDataIndexes.deadline,
    isEdit: true,
  });

  return (
    <>
      <div
        className={styles.taskDeadlineIconWrapper}
        onClick={handleOpenEditForm}
      >
        <FieldTimeOutlined className={styles.taskDeadlineIcon} />
        <Tooltip title="Edit task deadline" placement="right">
          <Typography.Text className={styles.taskDeadlineIconText}>
            Deadline
          </Typography.Text>
        </Tooltip>
      </div>

      {!isEditFormVisible ? (
        <Typography.Text className={styles.taskDeadlineText} strong>
          {getConvertDate(taskData.deadline)}
        </Typography.Text>
      ) : (
        <Form
          className={styles.taskDeadlineFormWrapper}
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
