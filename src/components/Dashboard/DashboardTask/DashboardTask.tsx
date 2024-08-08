import { Link } from "react-router-dom";

import { LoadingOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CircleIcon } from "components/CircleIcon/CircleIcon";

import { useGetProjectByIdQuery } from "store/api/projects/projects-api";

import { RouterPath } from "configs/route-config";

import { getConditionTaskPriorityColor } from "utils/dashboard/get-condition-task-priority-color";
import { getConditionTaskStatusColor } from "utils/dashboard/get-condition-task-status-color";
import { getConvertDate } from "utils/general/get-convert-date";

import { ITask } from "types/ITask";

import styles from "./DashboardTask.module.scss";

interface IDashboardTaskProps {
  taskData: ITask;
}

export const DashboardTask = (props: IDashboardTaskProps) => {
  const { taskData } = props;

  const { data: projectData, isLoading: isProjectDataLoading } =
    useGetProjectByIdQuery({ id: taskData.projectId });

  return (
    <div className={styles.dashboardTaskWrapper}>
      <CircleIcon
        width={15}
        height={15}
        color={getConditionTaskStatusColor(taskData.status)}
        isFilled={false}
      />

      <div className={styles.dashboardTaskMainInfoWrapper}>
        <Typography.Text className={styles.dashboardTaskFromProjectText}>
          From project:{" "}
          {isProjectDataLoading ? (
            <LoadingOutlined />
          ) : (
            <b>{projectData?.title}</b>
          )}
        </Typography.Text>

        <Typography.Text className={styles.dashboardTaskCreatedAt}>
          Created at: {taskData.createdAt}
        </Typography.Text>

        <Typography.Text className={styles.dashboardTaskDeadline}>
          Deadline:{" "}
          {taskData.deadline ? (
            getConvertDate(taskData.deadline)
          ) : (
            <Typography.Text
              className={styles.dashboardTaskDeadline}
              type="danger"
            >
              Not Specified
            </Typography.Text>
          )}
        </Typography.Text>

        <Typography.Text className={styles.dashboardTaskTitle}>
          {taskData.title}
        </Typography.Text>

        {taskData.description && (
          <Markdown
            className={styles.dashboardTaskDescription}
            remarkPlugins={[remarkGfm]}
          >
            {taskData.description}
          </Markdown>
        )}

        <Typography.Text className={styles.dashboardTaskPriority}>
          Priority:{" "}
          <b
            style={{
              color: getConditionTaskPriorityColor(taskData.priority),
            }}
          >
            {taskData.priority ?? (
              <Typography.Text
                className={styles.dashboardTaskDeadline}
                type="danger"
              >
                Not Specified
              </Typography.Text>
            )}
          </b>
        </Typography.Text>

        <Typography.Text className={styles.dashboardTaskStatus}>
          Status:{" "}
          <b style={{ color: getConditionTaskStatusColor(taskData.status) }}>
            {taskData.status}
          </b>
        </Typography.Text>

        <Link
          className={styles.dashboardTaskDetailsButtonLink}
          to={`${RouterPath.projects}/${projectData?.id}`}
        >
          <Button type="primary">
            Go to source project
          </Button>
        </Link>
      </div>
    </div>
  );
};
