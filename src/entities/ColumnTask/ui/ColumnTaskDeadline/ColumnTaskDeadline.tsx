import React from "react";

import { FieldTimeOutlined } from "@ant-design/icons";
import { Form, Tooltip, Typography } from "antd";

import { taskFieldNodes } from "shared/consts/task-field-nodes";
import { taskFieldsDataIndexes } from "shared/consts/task-list-fields";
import { useContexts } from "shared/lib/hooks/use-contexts";
import { useFormsUpdateQuery } from "shared/lib/hooks/use-forms-update-query";
import { useGetTaskFields } from "shared/lib/hooks/use-get-task-fields";
import { useUpdateTaskMutation } from "shared/lib/hooks/use-update-task-mutation";
import { getConvertDate } from "shared/lib/utils/get-convert-date";
import { getCurrentDate } from "shared/lib/utils/get-current-date";
import { ITask } from "shared/types/ITask";

import styles from "./ColumnTaskDeadline.module.scss";

export const ColumnTaskDeadline = () => {
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
        className={styles.columnTaskDeadlineIconWrapper}
        onClick={handleOpenEditForm}
      >
        <FieldTimeOutlined className={styles.columnTaskDeadlineIcon} />
        <Tooltip title="Edit task deadline" placement="right">
          <Typography.Text className={styles.columnTaskDeadlineIconText}>
            Deadline
          </Typography.Text>
        </Tooltip>
      </div>

      {!isEditFormVisible ? (
        <Typography.Text className={styles.columnTaskDeadlineText} strong>
          {getConvertDate(taskData.deadline)}
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
