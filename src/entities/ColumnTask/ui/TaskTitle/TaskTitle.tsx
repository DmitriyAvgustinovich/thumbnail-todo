import React from "react";

import { FontSizeOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form, Tooltip, Typography } from "antd";

import { taskFieldNodes } from "shared/consts/task-field-nodes";
import { taskFieldsDataIndexes } from "shared/consts/task-list-fields";
import { useContexts } from "shared/lib/hooks/use-contexts";
import { useFormsUpdateQuery } from "shared/lib/hooks/use-forms-update-query";
import { useGetColumnByIdQuery } from "shared/lib/hooks/use-get-column-by-id-query";
import { useGetTaskFields } from "shared/lib/hooks/use-get-task-fields";
import { useUpdateTaskMutation } from "shared/lib/hooks/use-update-task-mutation";
import { getCurrentDate } from "shared/lib/utils/get-current-date";
import { ITask } from "shared/types/ITask";

import styles from "./TaskTitle.module.scss";

export const TaskTitle = () => {
  const { taskDataContext: taskData } = useContexts();

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
    handleDeleteEntityFinishFailed,
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
          <Typography.Text className={styles.taskTitleIconText}>
            {taskData.title}
          </Typography.Text>
        </div>
      ) : (
        <Form
          layout="vertical"
          onFinish={handleUpdateEntityFinish}
          onFinishFailed={handleDeleteEntityFinishFailed}
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
