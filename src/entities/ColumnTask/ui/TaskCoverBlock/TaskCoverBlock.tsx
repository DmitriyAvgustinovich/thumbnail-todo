import React from "react";

import { useContexts } from "shared/lib/hooks/use-contexts";

import styles from "./TaskCoverBlock.module.scss";

interface ITaskCoverBlockProps {
  isTaskCoverImage?: boolean;
  isTaskCoverMonoColor?: boolean;
}

export const TaskCoverBlock = (props: ITaskCoverBlockProps) => {
  const { isTaskCoverImage, isTaskCoverMonoColor } = props;

  const { taskDataContext: taskData } = useContexts();

  return React.useMemo(() => {
    if (isTaskCoverImage) {
      return (
        <img
          className={styles.taskCoverBlockWrapper}
          src={taskData?.cover}
          alt=""
        />
      );
    } else if (isTaskCoverMonoColor) {
      return (
        <div
          className={styles.taskCoverBlockWrapper}
          style={{ backgroundColor: taskData.cover }}
        />
      );
    } else {
      return <></>;
    }
  }, [isTaskCoverMonoColor, isTaskCoverImage, taskData.cover]);
};
