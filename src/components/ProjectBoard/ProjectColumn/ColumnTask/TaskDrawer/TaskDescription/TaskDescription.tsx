import React from "react";

import {
  AlignLeftOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Form, Tooltip, Typography } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { MarkdownBlocks } from "components/MarkdownPreview/MarkdownBlocks/MarkdownBlocks";
import { MarkdownPreview } from "components/MarkdownPreview/MarkdownPreview";

import { useUpdateTaskMutation } from "store/api/tasks/tasks-api";

import { taskFieldNodes } from "constants/task/task-field-nodes";
import { taskFieldsDataIndexes } from "constants/task/task-list-fields";

import { useContexts } from "hooks/general/use-contexts";
import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";
import { useGetTaskFields } from "hooks/task/use-get-task-fields";

import { getCurrentDate } from "utils/general/get-current-date";

import { ITask } from "types/ITask";

import styles from "./TaskDescription.module.scss";

interface ITaskDescriptionProps {
  taskData: ITask;
}

export const TaskDescription = (props: ITaskDescriptionProps) => {
  const { taskData } = props;

  const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);

  const {
    taskFormContext: {
      markdownDescriptionValue,
      setMarkdownDescriptionDefaultValue,
    },
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
    handleMutationEntityFinishFailed,
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
          onFinishFailed={handleMutationEntityFinishFailed}
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
