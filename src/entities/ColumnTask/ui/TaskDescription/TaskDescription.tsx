import React from "react";

import {
  AlignLeftOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Form, Tooltip, Typography } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { MarkdownBlocks, MarkdownPreview } from "entities/Markdown";

import { taskFieldNodes } from "shared/consts/task-field-nodes";
import { taskFieldsDataIndexes } from "shared/consts/task-list-fields";
import { useContexts } from "shared/lib/hooks/use-contexts";
import { useFormsUpdateQuery } from "shared/lib/hooks/use-forms-update-query";
import { useGetTaskFields } from "shared/lib/hooks/use-get-task-fields";
import { useUpdateTaskMutation } from "shared/lib/hooks/use-update-task-mutation";
import { getCurrentDate } from "shared/lib/utils/get-current-date";
import { ITask } from "shared/types/ITask";

import styles from "./TaskDescription.module.scss";

export const TaskDescription = () => {
  const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);

  const {
    taskFormContext: {
      markdownDescriptionValue,
      setMarkdownDescriptionDefaultValue,
    },
    taskDataContext: taskData,
  } = useContexts();

  const handleOpenEditForm = () => {
    setIsEditFormVisible(!isEditFormVisible);
    setMarkdownDescriptionDefaultValue(taskData.description);
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
    successMutationMessage: "Task description updated successfully",
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
    taskFormElementNode: taskFieldNodes.textarea,
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
        <Markdown
          className={styles.taskDescriptionTextWrapper}
          remarkPlugins={[remarkGfm]}
        >
          {taskData.description}
        </Markdown>
      ) : (
        <Form
          layout="vertical"
          onFinish={handleUpdateEntityFinish}
          onFinishFailed={handleDeleteEntityFinishFailed}
        >
          {FormFields}

          <MarkdownBlocks />
          <MarkdownPreview markdownValue={markdownDescriptionValue} />

          <div className={styles.taskDescriptionEditFormButtonsWrapper}>
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
          </div>
        </Form>
      )}
    </>
  );
};
