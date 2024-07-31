import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Popconfirm, Typography } from "antd";

import { useDeleteTaskMutation } from "store/api/tasks/tasks-api";

import { useDeleteEntityQuery } from "hooks/general/use-delete-entity-query";

import { ITask } from "types/ITask";

import styles from "./SidebarDeleteTaskAction.module.scss";

interface ISidebarDeleteTaskActionProps {
  taskData: ITask;
  handleCloseTaskDrawer: () => void;
}

export const SidebarDeleteTaskAction = (
  props: ISidebarDeleteTaskActionProps
) => {
  const { taskData, handleCloseTaskDrawer } = props;

  const { handleDeleteEntityFinish, isDeleteEntityLoading } =
    useDeleteEntityQuery<ITask>({
      useDeleteQueryMutation: useDeleteTaskMutation,
      entityData: taskData,
      deleteSuccessAction: handleCloseTaskDrawer,
      successMutationMessage: "Task deleted successfully",
    });

  return (
    <Popconfirm
      title="Are you sure you want to delete this task?"
      onConfirm={handleDeleteEntityFinish}
    >
      <div
        className={`${styles.sidebarDeleteTaskActionButtonWrapper} ${
          isDeleteEntityLoading && styles.sidebarDeleteTaskActionDisabledDeleteButton
        }`}
      >
        {isDeleteEntityLoading ? <LoadingOutlined /> : <DeleteOutlined />}
        <Typography.Text>Delete task</Typography.Text>
      </div>
    </Popconfirm>
  );
};
