import { LoadingOutlined, UserAddOutlined } from "@ant-design/icons";
import { Popover, Tooltip, Typography } from "antd";

import { ProjectContributors } from "components/ProjectBoard/ProjectContributors/ProjectContributors";
import { ProjectContributorsSkeleton } from "components/ProjectBoard/ProjectContributors/ProjectContributorsSkeleton/ProjectContributorsSkeleton";

import { useGetProjectContributorsByProjectIdQuery } from "store/api/projectContributors/project-contributors-api";
import { useGetProjectByIdQuery } from "store/api/projects/projects-api";
import { useGetUserByIdQuery } from "store/api/users/users-api";

import { taskContributorsActionTypes } from "constants/task/task-contributors-action-types";

import { ITask } from "types/ITask";

import styles from "./SidebarAssignedToAction.module.scss";

interface ISidebarAssignedToActionProps {
  taskData: ITask;
}

export const SidebarAssignedToAction = (
  props: ISidebarAssignedToActionProps
) => {
  const { taskData } = props;

  const { data: projectData } = useGetProjectByIdQuery({
    id: taskData?.projectId,
  });

  const {
    data: projectContributorsData,
    isLoading: isProjectContributorsDataLoading,
  } = useGetProjectContributorsByProjectIdQuery({
    projectId: projectData?.id ?? "",
  });

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByIdQuery({
    id: taskData?.assignedToUserId,
  });

  const popoverContent = isProjectContributorsDataLoading ? (
    <ProjectContributorsSkeleton />
  ) : (
    projectContributorsData?.map((projectContributor) => (
      <ProjectContributors
        projectContributor={projectContributor}
        taskData={taskData}
        actionType={taskContributorsActionTypes.assignedTo}
      />
    ))
  );

  return (
    <Tooltip title="Assign a person responsible for the task" placement="top">
      <Popover
        content={popoverContent}
        title="Assigned to"
        placement="leftTop"
        trigger="click"
      >
        <div className={styles.sidebarAssignedToActionButtonWrapper}>
          <UserAddOutlined />
          <Typography.Text>
            Assigned to
            <br />
            {isUserDataLoading ? (
              <LoadingOutlined />
            ) : (
              <b>
                {userData?.name} {userData?.surname}
              </b>
            )}
          </Typography.Text>
        </div>
      </Popover>
    </Tooltip>
  );
};
