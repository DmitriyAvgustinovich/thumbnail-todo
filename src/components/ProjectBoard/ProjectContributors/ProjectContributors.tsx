import React from "react";

import { LoadingOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";

import {
  useAddTaskContributorMutation,
  useGetTaskContributorsByTaskIdQuery,
} from "store/api/taskContributors/task-contributors-api";
import { useUpdateTaskMutation } from "store/api/tasks/tasks-api";
import { useGetUserByIdQuery } from "store/api/users/users-api";

import { taskContributorsActionTypes } from "constants/task/task-contributors-action-types";

import { IProjectContributor } from "types/IProjectContributor";
import { ITask } from "types/ITask";

import styles from "./ProjectContributors.module.scss";
import { ProjectContributorsSkeleton } from "./ProjectContributorsSkeleton/ProjectContributorsSkeleton";

interface IProjectContributorProps {
  projectContributor: IProjectContributor;
  taskData: ITask;
  actionType: string;
}

export const ProjectContributors = (props: IProjectContributorProps) => {
  const { projectContributor, taskData, actionType } = props;

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByIdQuery({
    id: projectContributor.userId,
  });

  const { data: taskContributorsData } = useGetTaskContributorsByTaskIdQuery({
    taskId: taskData.id,
  });

  const [updateTask, { isLoading: isUpdateTaskLoading }] =
    useUpdateTaskMutation();

  const [addTaskContributor, { isLoading: isAddTaskContributorLoading }] =
    useAddTaskContributorMutation();

  const handleAddAssignedTaskContributor = () => {
    const updatedData = {
      id: taskData.id,
      assignedToUserId: userData?.id,
    };

    updateTask(updatedData);
  };

  const handleAddTaskContributor = () => {
    const addedData = {
      taskId: taskData?.id ?? "",
      userId: userData?.id ?? "",
    };

    addTaskContributor(addedData);
  };

  const isUserHasTaskContributor =
    taskContributorsData
      ?.map((taskContributor) => taskContributor.userId)
      ?.includes(userData?.id ?? "") &&
    actionType === taskContributorsActionTypes.taskContributors;

  const isUserHasAssignedToTask =
    taskData.assignedToUserId === projectContributor.userId &&
    taskContributorsActionTypes.assignedTo;

  const AddButton = React.useMemo(() => {
    switch (actionType) {
      case taskContributorsActionTypes.assignedTo:
        return (
          <>
            {!isUpdateTaskLoading && !isUserHasAssignedToTask && (
              <PlusOutlined
                className={styles.projectContributorsAddIcon}
                onClick={handleAddAssignedTaskContributor}
              />
            )}

            {isUpdateTaskLoading && <LoadingOutlined />}
          </>
        );
      case taskContributorsActionTypes.taskContributors:
        return (
          <>
            {!isAddTaskContributorLoading && !isUserHasTaskContributor && (
              <PlusOutlined
                className={styles.projectContributorsAddIcon}
                onClick={handleAddTaskContributor}
              />
            )}

            {isAddTaskContributorLoading && <LoadingOutlined />}
          </>
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    actionType,
    isUserHasAssignedToTask,
    isUserHasTaskContributor,
    isUpdateTaskLoading,
    isAddTaskContributorLoading,
  ]);

  return (
    <>
      {isUserDataLoading ? (
        <ProjectContributorsSkeleton />
      ) : (
        <div className={styles.projectContributorsWrapper}>
          {userData?.avatarUrl ? (
            <img
              className={styles.projectContributorAvatar}
              src={userData?.avatarUrl}
              alt=""
            />
          ) : (
            <Avatar
              className={styles.projectContributorAvatar}
              icon={<UserOutlined />}
            />
          )}

          <Typography.Text className={styles.projectContributorName}>
            {userData?.name} {userData?.surname}{" "}
          </Typography.Text>

          {AddButton}
        </div>
      )}
    </>
  );
};
