import React from "react";

import { AddTaskContributor } from "features/addTaskContributor";
import { AssignedTaskToProjectContributor } from "features/assignedTaskToProjectContributor";

import { contributorActionTypes } from "shared/consts/contributor-action-types";
import { useGetUserByIdQuery } from "shared/lib/hooks/use-get-user-by-id-query";
import { IProjectContributor } from "shared/types/IProjectContributor";
import { UserInListBlock } from "shared/ui/UserInListBlock/UserInListBlock";

import { ProjectContributorsSkeleton } from "../ProjectContributorsSkeleton/ProjectContributorsSkeleton";

interface IProjectContributorProps {
  projectContributor: IProjectContributor;
  contributorActionType: string;
}

export const ProjectContributors = (props: IProjectContributorProps) => {
  const { projectContributor, contributorActionType } = props;

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByIdQuery({
    id: projectContributor.userId,
  });

  const AddButton = React.useMemo(() => {
    switch (contributorActionType) {
      case contributorActionTypes.addTaskContributor:
        return <AddTaskContributor userData={userData} />;
      case contributorActionTypes.taskAssignedTo:
        return (
          <AssignedTaskToProjectContributor
            userData={userData}
            projectContributorData={projectContributor}
          />
        );
    }
  }, [contributorActionType, projectContributor, userData]);

  return (
    <div>
      {isUserDataLoading ? (
        <ProjectContributorsSkeleton />
      ) : (
        <UserInListBlock userData={userData}>{AddButton}</UserInListBlock>
      )}
    </div>
  );
};
