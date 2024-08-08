import React from "react";

import { FileImageOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Popover, Typography } from "antd";

import { UploadButton } from "components/UploadButton/UploadButton";

import { useUpdateTaskMutation } from "store/api/tasks/tasks-api";

import { taskCoverColors } from "constants/task/task-cover-colors";

import { ITask } from "types/ITask";

import styles from "./SidebarCoverAction.module.scss";

interface ISidebarCoverActionProps {
  taskData: ITask;
}

export const SidebarCoverAction = (props: ISidebarCoverActionProps) => {
  const { taskData } = props;

  const conditionImageUrl = (() => {
    if (taskData?.cover?.startsWith("/")) {
      return taskData?.cover ?? "";
    } else if (taskData?.cover?.startsWith("#")) {
      return "";
    } else {
      return "";
    }
  })();

  const [imageUrl, setImageUrl] = React.useState(conditionImageUrl);

  const [updateTask, { isLoading: isUpdateTaskLoading }] =
    useUpdateTaskMutation();

  const handleSetTaskCover = (cover: string) => {
    const updatedData = {
      id: taskData.id,
      cover,
    };

    updateTask(updatedData);
  };

  const handleClearTaskCover = () => {
    const updatedData = {
      id: taskData.id,
      cover: "",
    };

    updateTask(updatedData);
    setImageUrl("");
  };

  const popoverContent = (
    <>
      {taskData?.cover && (
        <Button
          className={styles.sidebarCoverActionClearButton}
          onClick={handleClearTaskCover}
          block
          type="primary"
        >
          Clear cover
        </Button>
      )}

      <Typography.Text>
        Colors {isUpdateTaskLoading && <LoadingOutlined />}
      </Typography.Text>

      <div className={styles.sidebarCoverActionColorsWrapper}>
        {taskCoverColors.map((color) => (
          <div
            key={color}
            className={styles.sidebarCoverActionButton}
            style={{ backgroundColor: color }}
            onClick={() => handleSetTaskCover(color)}
          />
        ))}
      </div>

      <Typography.Text className={styles.sidebarCoverActionUploadText}>
        Upload cover
      </Typography.Text>

      <UploadButton
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        downloadAfterUploadAction={handleSetTaskCover}
      />
    </>
  );

  return (
    <Popover
      content={popoverContent}
      title="Cover"
      placement="leftTop"
      trigger="click"
    >
      <div className={styles.sidebarCoverActionButtonWrapper}>
        <FileImageOutlined />
        <Typography.Text>Cover</Typography.Text>
      </div>
    </Popover>
  );
};
