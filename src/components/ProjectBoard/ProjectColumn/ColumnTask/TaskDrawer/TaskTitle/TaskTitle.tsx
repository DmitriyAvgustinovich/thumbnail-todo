import React from "react";

import { FontSizeOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form, Tooltip, Typography } from "antd";

import { useGetColumnByIdQuery } from "store/api/columns/columns-api";
import { useUpdateTaskMutation } from "store/api/tasks/tasks-api";

import { taskFieldNodes } from "constants/task/task-field-nodes";
import { taskFieldsDataIndexes } from "constants/task/task-list-fields";

import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";
import { useGetTaskFields } from "hooks/task/use-get-task-fields";

import { getCurrentDate } from "utils/general/get-current-date";

import { ITask } from "types/ITask";

import styles from "./TaskTitle.module.scss";

interface ITaskTitleProps {
  taskData: ITask;
}

export const TaskTitle = (props: ITaskTitleProps) => {
  const { taskData } = props;

  const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);

  const handleOpenEditForm = () => {
    setIsEditFormVisible(!isEditFormVisible);
  };

  const handleCloseEditForm = () => {
    setIsEditFormVisible(false);
  };

  const { data: columnData, isLoading: isColumnDataLoading } =
    useGetColumnByIdQuery({ id: taskData.columnId });

  const {
    handleUpdateEntityFinish,
    handleMutationEntityFinishFailed,
    isUpdateEntityLoading,
  } = useFormsUpdateQuery<ITask, ITask>({
    useUpdateQueryMutation: useUpdateTaskMutation,
    handleCloseUpdateForm: handleCloseEditForm,
    entityData: taskData,
    successMutationMessage: "Task title updated successfully",
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
    taskFormElementNode: taskFieldNodes.input,
    taskFormElement: taskFieldsDataIndexes.title,
    isEdit: true,
  });

  return (
    <>
      <div className={styles.taskTitleIconWrapper} onClick={handleOpenEditForm}>
        <FontSizeOutlined className={styles.taskTitleIcon} />
        <Tooltip title="Edit task title" placement="right">
          <Typography.Text className={styles.taskTitleIconText}>
            Title
          </Typography.Text>
        </Tooltip>
      </div>

      {!isEditFormVisible ? (
        <div className={styles.taskTitleTextWrapper}>
          <Typography.Text
            className={styles.taskTitleIconText}
            onClick={handleOpenEditForm}
          >
            {taskData.title}
          </Typography.Text>
        </div>
      ) : (
        <Form
          layout="vertical"
          onFinish={handleUpdateEntityFinish}
          onFinishFailed={handleMutationEntityFinishFailed}
        >
          {FormFields}
        </Form>
      )}

      <div className={styles.taskTitleTimeInfoWrapper}>
        <Typography.Text className={styles.taskTitleTimeInfoText}>
          In column:{" "}
          {isColumnDataLoading ? (
            <LoadingOutlined />
          ) : (
            <u>{columnData?.title}</u>
          )}
        </Typography.Text>

        <Typography.Text className={styles.taskTitleTimeInfoText}>
          Created at: <u>{taskData.createdAt}</u>
        </Typography.Text>

        <Typography.Text className={styles.taskTitleTimeInfoText}>
          Updated at: <u>{taskData.updatedAt}</u>
        </Typography.Text>
      </div>
    </>
  );
};
