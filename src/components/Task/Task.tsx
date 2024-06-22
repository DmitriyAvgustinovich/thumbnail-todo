import { EllipsisOutlined } from "@ant-design/icons";
import { Popover, Tooltip, Typography } from "antd";

import { CircleIcon } from "components/CircleIcon/CircleIcon";

import { useGetEditAndDeleteTaskButtons } from "hooks/dashboard/use-get-edit-and-delete-task-buttonts";

import { getConditionTaskPriorityColor } from "utils/dashboard/get-condition-task-priority-color";
import { getConditionTaskStatusColor } from "utils/dashboard/get-condition-task-status-color";
import { getConvertDate } from "utils/general/get-convert-date";

import { ITask } from "types/ITask";

import styles from "./Task.module.scss";

interface ITaskProps extends ITask {}

export const Task = (props: ITaskProps) => {
  const { id, title, description, priority, status, deadline, createdAt } =
    props;

  const { EditAndDeleteTaskButtons } = useGetEditAndDeleteTaskButtons({
    taskId: id,
    styles,
  });

  return (
    <div className={styles.taskWrapper}>
      <CircleIcon
        width={15}
        height={15}
        color={getConditionTaskStatusColor(status)}
        isFilled={false}
      />

      <div className={styles.taskMainInfoWrapper}>
        <Typography.Text className={styles.taskDeadline}>
          Deadline: {getConvertDate(deadline)}
        </Typography.Text>
        <Typography.Text className={styles.taskTitle}>{title}</Typography.Text>

        <Typography.Text className={styles.taskDescription}>
          {description}
        </Typography.Text>

        <div className={styles.taskSecondInfoWrapper}>
          <Typography.Text className={styles.taskPriority}>
            Priority:{" "}
            <b style={{ color: getConditionTaskPriorityColor(priority) }}>
              {priority}
            </b>
          </Typography.Text>

          <Typography.Text className={styles.taskStatus}>
            Status:{" "}
            <b style={{ color: getConditionTaskStatusColor(status) }}>
              {status}
            </b>
          </Typography.Text>
        </div>
      </div>

      <div className={styles.taskAdditionalInfoWrapper}>
        <Tooltip title="Additional actions">
          <Popover
            content={EditAndDeleteTaskButtons}
            trigger="click"
            placement="bottom"
          >
            <EllipsisOutlined className={styles.taskAdditionalActionsIcon} />
          </Popover>
        </Tooltip>

        <img
          className={styles.taskImage}
          src="https://photogora.ru/img/product/thumb/4897/5d2efa2ce25635320511549050122246.jpg"
          alt=""
        />

        <Typography.Text className={styles.taskCreatedAt}>
          Created at: {createdAt}
        </Typography.Text>
      </div>
    </div>
  );
};
