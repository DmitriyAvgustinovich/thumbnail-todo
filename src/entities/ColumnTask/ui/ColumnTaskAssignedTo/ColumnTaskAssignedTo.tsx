import { LoadingOutlined, UserAddOutlined } from "@ant-design/icons";
import { Popover, Tag } from "antd";

import { contributorActionTypes } from "shared/consts/contributor-action-types";
import { useContexts } from "shared/lib/hooks/use-contexts";
import { useGetProjectByIdQuery } from "shared/lib/hooks/use-get-project-by-id-query";
import { useGetUserByIdQuery } from "shared/lib/hooks/use-get-user-by-id-query";

import styles from "./ColumnTaskAssignedTo.module.scss";
import {
  ProjectContributors,
  ProjectContributorsSkeleton,
} from "../../../ProjectContributors";
import { useGetProjectContributorsByProjectIdQuery } from "../../api/column-task-api";

export const ColumnTaskAssignedTo = () => {
  const { taskDataContext: taskData } = useContexts();

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

  const PopoverContent = isProjectContributorsDataLoading ? (
    <ProjectContributorsSkeleton />
  ) : (
    projectContributorsData?.map((projectContributor) => (
      <ProjectContributors
        projectContributor={projectContributor}
        contributorActionType={contributorActionTypes.taskAssignedTo}
      />
    ))
  );

  return (
    <Popover
      content={PopoverContent}
      title="Assigned to"
      placement="leftBottom"
      trigger="click"
    >
      <div className={styles.columnTaskAssignedToWrapper}>
        <UserAddOutlined />
        <div>
          Assigned to
          <br />
          {isUserDataLoading ? (
            <LoadingOutlined />
          ) : (
            <div className={styles.columnTaskAssignedToNameWrapper}>
              <Tag>
                <b>
                  {userData?.name} {userData?.surname}
                </b>
              </Tag>
            </div>
          )}
        </div>
      </div>
    </Popover>
  );
};
