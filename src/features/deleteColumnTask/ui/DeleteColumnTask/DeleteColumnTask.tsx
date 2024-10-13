import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Popconfirm, Typography } from "antd";

import { useContexts } from "shared/lib/hooks/use-contexts";
import { useDeleteEntityQuery } from "shared/lib/hooks/use-delete-entity-query";

import styles from "./DeleteColumnTask.module.scss";
import { useDeleteTaskMutation } from "../../api/delete-column-task-api";

interface IDeleteColumnTaskProps {
  handleCloseTaskDrawer: () => void;
}

export const DeleteColumnTask = (props: IDeleteColumnTaskProps) => {
  const { handleCloseTaskDrawer } = props;

  const { taskDataContext: taskData } = useContexts();

  const { handleDeleteEntityFinish, isDeleteEntityLoading } =
    useDeleteEntityQuery({
      useDeleteQueryMutation: useDeleteTaskMutation,
      entityDataIdField: "id",
      entityDataId: taskData?.id ?? "",
      deleteSuccessAction: handleCloseTaskDrawer,
      successMutationMessage: "Project deleted successfully",
    });

  return (
    <Popconfirm
      title="Are you sure you want to delete this task?"
      onConfirm={handleDeleteEntityFinish}
    >
      <div
        className={`${styles.deleteColumnTaskButtonWrapper} ${
          isDeleteEntityLoading && styles.deleteColumnTaskDisabledDeleteButton
        }`}
      >
        {isDeleteEntityLoading ? <LoadingOutlined /> : <DeleteOutlined />}
        <Typography.Text>Delete task</Typography.Text>
      </div>
    </Popconfirm>
  );
};
