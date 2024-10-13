import React from "react";

import { FileImageOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Popover, Typography } from "antd";

import { useContexts } from "shared/lib/hooks/use-contexts";
import { useUpdateTaskMutation } from "shared/lib/hooks/use-update-task-mutation";
import { UploadButton } from "shared/ui/UploadButton/UploadButton";

import styles from "./ColumnTaskCover.module.scss";
import { taskCoverColors } from "../../model/consts/task-cover-colors";

interface IColumnTaskCoverProps {
  isTaskCoverImage?: boolean;
  isTaskCoverMonoColor?: boolean;
}

export const ColumnTaskCover = (props: IColumnTaskCoverProps) => {
  const { isTaskCoverImage, isTaskCoverMonoColor } = props;

  const { taskDataContext: taskData } = useContexts();

  const conditionImageUrl = (() => {
    if (isTaskCoverImage) {
      return taskData?.cover ?? "";
    } else if (isTaskCoverMonoColor) {
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

  const PopoverContent = (
    <>
      {taskData?.cover && (
        <Button
          className={styles.columnTaskCoverClearButton}
          onClick={handleClearTaskCover}
          block
          type="primary"
        >
          Clear cover
        </Button>
      )}

      <Typography.Text className={styles.columnTaskCoverUploadText}>
        Colors {isUpdateTaskLoading && <LoadingOutlined />}
      </Typography.Text>

      <div className={styles.columnTaskCoverColorsWrapper}>
        {taskCoverColors.map((color) => (
          <div
            key={color}
            className={styles.columnTaskCoverButton}
            style={{ backgroundColor: color }}
            onClick={() => handleSetTaskCover(color)}
          />
        ))}
      </div>

      <Typography.Text className={styles.columnTaskCoverUploadText}>
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
      content={PopoverContent}
      title="Cover"
      placement="leftTop"
      trigger="click"
    >
      <div className={styles.columnTaskCoverButtonWrapper}>
        <FileImageOutlined />
        <Typography.Text>Cover</Typography.Text>
      </div>
    </Popover>
  );
};
