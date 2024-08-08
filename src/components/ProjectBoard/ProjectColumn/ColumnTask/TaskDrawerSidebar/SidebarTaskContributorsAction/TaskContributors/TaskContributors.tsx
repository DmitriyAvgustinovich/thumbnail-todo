import {
  CloseOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Typography } from "antd";

import { ProjectContributorsSkeleton } from "components/ProjectBoard/ProjectContributors/ProjectContributorsSkeleton/ProjectContributorsSkeleton";

import { useDeleteTaskContributorMutation } from "store/api/taskContributors/task-contributors-api";
import { useGetUserByIdQuery } from "store/api/users/users-api";

import { useDeleteEntityQuery } from "hooks/general/use-delete-entity-query";

import { ITaskContributor } from "types/ITaskContributor";

import styles from "./TaskContributors.module.scss";

interface ITaskContributorsProps {
  taskContributor: ITaskContributor;
}

export const TaskContributors = (props: ITaskContributorsProps) => {
  const { taskContributor } = props;

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByIdQuery({
    id: taskContributor.userId,
  });

  const { handleDeleteEntityFinish, isDeleteEntityLoading } =
    useDeleteEntityQuery<ITaskContributor>({
      useDeleteQueryMutation: useDeleteTaskContributorMutation,
      entityData: taskContributor,
      successMutationMessage: "Task contributor deleted successfully",
    });

  return (
    <>
      {isUserDataLoading ? (
        <ProjectContributorsSkeleton />
      ) : (
        <div className={styles.taskContributorsWrapper}>
          {userData?.avatarUrl ? (
            <img
              className={styles.taskContributorAvatar}
              src={userData?.avatarUrl}
              alt=""
            />
          ) : (
            <Avatar
              className={styles.taskContributorAvatar}
              icon={<UserOutlined />}
            />
          )}

          <Typography.Text className={styles.taskContributorName}>
            {userData?.name} {userData?.surname}{" "}
          </Typography.Text>

          {!isDeleteEntityLoading && (
            <CloseOutlined
              className={styles.taskContributorDeleteIcon}
              onClick={handleDeleteEntityFinish}
            />
          )}

          {isDeleteEntityLoading && <LoadingOutlined />}
        </div>
      )}
    </>
  );
};
