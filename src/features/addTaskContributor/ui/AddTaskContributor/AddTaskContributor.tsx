import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { useContexts } from "shared/lib/hooks/use-contexts";
import { useGetTaskContributorsByTaskIdQuery } from "shared/lib/hooks/use-get-task-contributors-by-task-id-query";
import { IUser } from "shared/types/IUser";

import styles from "./AddTaskContributor.module.scss";
import { useAddTaskContributorMutation } from "../../api/add-task-contributor-api";

interface IAddTaskContributorProps {
  userData?: IUser;
}

export const AddTaskContributor = (props: IAddTaskContributorProps) => {
  const { userData } = props;

  const { taskDataContext: taskData } = useContexts();

  const [addTaskContributor, { isLoading: isAddTaskContributorLoading }] =
    useAddTaskContributorMutation();

  const { data: taskContributorsData } = useGetTaskContributorsByTaskIdQuery({
    taskId: taskData.id,
  });

  const isUserHasTaskContributor = taskContributorsData
    ?.map((taskContributor) => taskContributor.userId)
    ?.includes(userData?.id ?? "");

  const handleAddTaskContributor = () => {
    const addedData = {
      taskId: taskData?.id ?? "",
      userId: userData?.id ?? "",
    };

    addTaskContributor(addedData);
  };

  return (
    <>
      {!isAddTaskContributorLoading && !isUserHasTaskContributor && (
        <Tooltip title="Add as task contributor">
          <PlusOutlined
            className={styles.addTaskContributorIcon}
            onClick={handleAddTaskContributor}
          />
        </Tooltip>
      )}

      {isAddTaskContributorLoading && <LoadingOutlined />}
    </>
  );
};
