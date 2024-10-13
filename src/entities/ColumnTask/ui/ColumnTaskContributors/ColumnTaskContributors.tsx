import { UsergroupAddOutlined } from "@ant-design/icons";
import { Popover, Typography } from "antd";

import { DeleteTaskContributor } from "features/deleteTaskContributor";

import { contributorActionTypes } from "shared/consts/contributor-action-types";
import { useContexts } from "shared/lib/hooks/use-contexts";
import { useGetProjectByIdQuery } from "shared/lib/hooks/use-get-project-by-id-query";
import { useGetTaskContributorsByTaskIdQuery } from "shared/lib/hooks/use-get-task-contributors-by-task-id-query";

import styles from "./ColumnTaskContributors.module.scss";
import {
  ProjectContributors,
  ProjectContributorsSkeleton,
} from "../../../ProjectContributors";
import { useGetProjectContributorsByProjectIdQuery } from "../../api/column-task-api";

export const ColumnTaskContributors = () => {
  const { taskDataContext: taskData } = useContexts();

  const { data: projectData } = useGetProjectByIdQuery({
    id: taskData?.projectId,
  });

  const {
    data: taskContributorsData,
    isLoading: isTaskContributorsDataLoading,
  } = useGetTaskContributorsByTaskIdQuery({
    taskId: taskData?.id ?? "",
  });

  const {
    data: projectContributorsData,
    isLoading: isProjectContributorsDataLoading,
  } = useGetProjectContributorsByProjectIdQuery({
    projectId: projectData?.id ?? "",
  });

  const PopoverContent =
    isProjectContributorsDataLoading || isTaskContributorsDataLoading ? (
      <ProjectContributorsSkeleton />
    ) : (
      <>
        {!taskContributorsData?.length && (
          <Typography.Text className={styles.sidebarTaskContributorsTitle}>
            No task contributors.
          </Typography.Text>
        )}

        {taskContributorsData?.map((taskContributor) => (
          <DeleteTaskContributor taskContributor={taskContributor} />
        ))}

        <Typography.Text strong>Project contributors</Typography.Text>
        {projectContributorsData?.map((projectContributor) => (
          <ProjectContributors
            projectContributor={projectContributor}
            contributorActionType={contributorActionTypes.addTaskContributor}
          />
        ))}
      </>
    );

  return (
    <Popover
      content={PopoverContent}
      title="Task contributors"
      placement="leftTop"
      trigger="click"
    >
      <div className={styles.columnTaskContributorsButtonWrapper}>
        <UsergroupAddOutlined />
        <Typography.Text>Task contributors</Typography.Text>
      </div>
    </Popover>
  );
};
