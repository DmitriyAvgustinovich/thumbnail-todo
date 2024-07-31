import { UsergroupAddOutlined } from "@ant-design/icons";
import { Collapse, Popover, Tooltip, Typography } from "antd";

import { ProjectContributors } from "components/ProjectBoard/ProjectContributors/ProjectContributors";
import { ProjectContributorsSkeleton } from "components/ProjectBoard/ProjectContributors/ProjectContributorsSkeleton/ProjectContributorsSkeleton";

import { useGetProjectContributorsByProjectIdQuery } from "store/api/projectContributors/project-contributors-api";
import { useGetProjectByIdQuery } from "store/api/projects/projects-api";
import { useGetTaskContributorsByTaskIdQuery } from "store/api/taskContributors/task-contributors-api";

import { taskContributorsActionTypes } from "constants/task/task-contributors-action-types";

import { ITask } from "types/ITask";

import styles from "./SidebarTaskContributorsAction.module.scss";
import { TaskContributors } from "./TaskContributors/TaskContributors";

interface ISidebarTaskContributorsActionProps {
  taskData: ITask;
}

export const SidebarTaskContributorsAction = (
  props: ISidebarTaskContributorsActionProps
) => {
  const { taskData } = props;

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

  const collapseItems = [
    {
      key: "0",
      label: "Project contributors",
      children: (
        <>
          {projectContributorsData?.map((projectContributor) => (
            <ProjectContributors
              projectContributor={projectContributor}
              taskData={taskData}
              actionType={taskContributorsActionTypes.taskContributors}
            />
          ))}
        </>
      ),
    },
  ];

  const popoverContent =
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
          <TaskContributors taskContributor={taskContributor} />
        ))}

        <Collapse items={collapseItems} />
      </>
    );

  return (
    <Tooltip title="Add or remove contributors to this task" placement="left">
      <Popover
        content={popoverContent}
        title="Task contributors"
        placement="bottom"
        trigger="click"
      >
        <div className={styles.sidebarTaskContributorsActionButtonWrapper}>
          <UsergroupAddOutlined />
          <Typography.Text>Task contributors</Typography.Text>
        </div>
      </Popover>
    </Tooltip>
  );
};
