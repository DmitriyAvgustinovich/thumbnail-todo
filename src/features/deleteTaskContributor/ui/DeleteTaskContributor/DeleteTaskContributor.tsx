import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";

import { ProjectContributorsSkeleton } from "entities/ProjectContributors";

import { useDeleteEntityQuery } from "shared/lib/hooks/use-delete-entity-query";
import { useGetUserByIdQuery } from "shared/lib/hooks/use-get-user-by-id-query";
import { ITaskContributor } from "shared/types/ITaskContributor";
import { UserInListBlock } from "shared/ui/UserInListBlock/UserInListBlock";

import styles from "./DeleteTaskContributor.module.scss";
import { useDeleteTaskContributorMutation } from "../../api/delete-task-contributor-api";

interface IDeleteTaskContributorProps {
  taskContributor: ITaskContributor;
}

export const DeleteTaskContributor = (props: IDeleteTaskContributorProps) => {
  const { taskContributor } = props;

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByIdQuery({
    id: taskContributor.userId,
  });

  const { handleDeleteEntityFinish, isDeleteEntityLoading } =
    useDeleteEntityQuery({
      useDeleteQueryMutation: useDeleteTaskContributorMutation,
      entityDataIdField: "id",
      entityDataId: taskContributor?.id ?? "",
      successMutationMessage: "Task contributor deleted successfully",
    });

  return (
    <>
      {isUserDataLoading ? (
        <ProjectContributorsSkeleton />
      ) : (
        <UserInListBlock userData={userData}>
          {!isDeleteEntityLoading && (
            <CloseOutlined
              className={styles.deleteTaskContributorIcon}
              onClick={handleDeleteEntityFinish}
            />
          )}

          {isDeleteEntityLoading && <LoadingOutlined />}
        </UserInListBlock>
      )}
    </>
  );
};
