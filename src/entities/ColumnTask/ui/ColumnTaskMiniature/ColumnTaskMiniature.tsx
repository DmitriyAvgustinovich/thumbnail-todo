import { ClockCircleOutlined, CommentOutlined } from "@ant-design/icons";
import { Tag, Typography } from "antd";

import { useContexts } from "shared/lib/hooks/use-contexts";
import { getConvertDate } from "shared/lib/utils/get-convert-date";

import styles from "./ColumnTaskMiniature.module.scss";
import { useGetCommentsByTaskIdQuery } from "../../api/column-task-api";
import { TaskCoverBlock } from "../TaskCoverBlock/TaskCoverBlock";

interface IColumnTaskMiniatureProps {
  handleOpenTaskDrawer: () => void;
  isTaskCoverImage?: boolean;
  isTaskCoverMonoColor?: boolean;
}

export const ColumnTaskMiniature = (props: IColumnTaskMiniatureProps) => {
  const { handleOpenTaskDrawer, isTaskCoverImage, isTaskCoverMonoColor } =
    props;

  const { taskDataContext: taskData } = useContexts();

  const { data: commentsData } = useGetCommentsByTaskIdQuery({
    taskId: taskData.id,
  });

  return (
    <div
      className={styles.columnTaskMiniatureWrapper}
      onClick={handleOpenTaskDrawer}
    >
      {taskData?.cover && (
        <TaskCoverBlock
          isTaskCoverImage={isTaskCoverImage}
          isTaskCoverMonoColor={isTaskCoverMonoColor}
        />
      )}

      <Typography.Text className={styles.columnTaskMiniatureTitle}>
        {taskData?.title}
      </Typography.Text>

      <div>
        {taskData?.deadline && (
          <Tag>
            <ClockCircleOutlined /> {getConvertDate(taskData?.deadline)}
          </Tag>
        )}

        {!!commentsData?.length && (
          <Tag>
            <CommentOutlined
              className={styles.columnTaskMiniatureCommentsIcon}
            />
            {commentsData?.length}
          </Tag>
        )}
      </div>
    </div>
  );
};
