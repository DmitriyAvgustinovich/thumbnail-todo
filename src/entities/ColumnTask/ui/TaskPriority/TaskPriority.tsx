import React from "react";

import { LineChartOutlined } from "@ant-design/icons";
import { Form, Tooltip, Typography } from "antd";

import { taskFieldNodes } from "shared/consts/task-field-nodes";
import { taskFieldsDataIndexes } from "shared/consts/task-list-fields";
import { useContexts } from "shared/lib/hooks/use-contexts";
import { useFormsUpdateQuery } from "shared/lib/hooks/use-forms-update-query";
import { useGetTaskFields } from "shared/lib/hooks/use-get-task-fields";
import { useUpdateTaskMutation } from "shared/lib/hooks/use-update-task-mutation";
import { getConditionTaskPriorityColor } from "shared/lib/utils/get-condition-task-priority-color";
import { getCurrentDate } from "shared/lib/utils/get-current-date";
import { ITask } from "shared/types/ITask";

import styles from "./TaskPriority.module.scss";

export const TaskPriority = () => {
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
