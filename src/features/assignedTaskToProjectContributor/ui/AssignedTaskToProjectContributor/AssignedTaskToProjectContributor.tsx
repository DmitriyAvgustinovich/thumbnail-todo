import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

import { useContexts } from "shared/lib/hooks/use-contexts";
import { useUpdateTaskMutation } from "shared/lib/hooks/use-update-task-mutation";
import { IProjectContributor } from "shared/types/IProjectContributor";
import { IUser } from "shared/types/IUser";

import styles from "./AssignedTaskToProjectContributor.module.scss";

interface IAssignedTaskToProjectContributorProps {
  userData?: IUser;
  projectContributorData: IProjectContributor;
}

export const AssignedTaskToProjectContributor = (
  props: IAssignedTaskToProjectContributorProps
) => {
  const { userData, projectContributorData } = props;

  const { taskDataContext: taskData } = useContexts();

  const [updateTask, { isLoading: isUpdateTaskLoading }] =
    useUpdateTaskMutation();

  const handleAddAssignedTaskContributor = () => {
    const updatedData = {
      id: taskData.id,
      assignedToUserId: userData?.id,
    };

    updateTask(updatedData);
  };

  const isTaskHasAssignedToUser =
    taskData.assignedToUserId === projectContributorData.userId;

  return (
    <>
      {!isUpdateTaskLoading && !isTaskHasAssignedToUser && (
        <PlusOutlined
          className={styles.assignedTaskToProjectContributorIcon}
          onClick={handleAddAssignedTaskContributor}
        />
      )}

      {isUpdateTaskLoading && <LoadingOutlined />}
    </>
  );
};
