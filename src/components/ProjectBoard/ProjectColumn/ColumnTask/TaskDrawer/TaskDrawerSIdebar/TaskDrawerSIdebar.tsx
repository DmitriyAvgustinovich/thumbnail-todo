import {
  DeleteOutlined,
  FileImageOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Popconfirm, Spin, Tooltip, Typography } from "antd";

import { useDeleteTaskMutation } from "store/api/tasks/tasks-api";

import { useDeleteEntityQuery } from "hooks/general/use-delete-entity-query";

import { ITask } from "types/ITask";

import styles from "./TaskDrawerSIdebar.module.scss";

interface ITaskDrawerSIdebarProps {
  taskData: ITask;
  handleCloseTaskDrawer: () => void;
}

export const TaskDrawerSIdebar = (props: ITaskDrawerSIdebarProps) => {
  const { taskData, handleCloseTaskDrawer } = props;

  const { handleDeleteEntityFinish, isDeleteEntityLoading } =
    useDeleteEntityQuery<ITask>({
      useDeleteQueryMutation: useDeleteTaskMutation,
      entityData: taskData,
      deleteSuccessAction: handleCloseTaskDrawer,
      successMutationMessage: "Task deleted successfully",
    });

  const sidebarButtonsArray = [
    {
      icon: <UserOutlined />,
      text: "Contributors",
      action: () => {},
      tooltipTitle: "Add or remove contributors to this task",
    },
    {
      icon: <FileImageOutlined />,
      text: "Cover",
      action: () => {},
      tooltipTitle: "Add or remove cover to this task",
    },
    {
      icon: isDeleteEntityLoading ? (
        <Spin
          className={styles.taskDrawerSidebarDeleteStatusSpinner}
          indicator={<LoadingOutlined spin />}
          size="small"
        />
      ) : (
        <DeleteOutlined />
      ),
      text: "Delete task",
      action: handleDeleteEntityFinish,
      tooltipTitle: "Delete this task",
      requiredConfirm: true,
      confirmDeleteTitle: "Are you sure you want to delete this task?",
    },
  ];

  return (
    <div>
      <Typography.Text className={styles.taskDrawerSidebarHeaderText}>
        Actions
      </Typography.Text>

      {sidebarButtonsArray.map((sidebarButton) => (
        <>
          {!sidebarButton.requiredConfirm ? (
            <Tooltip title={sidebarButton.tooltipTitle} placement="left">
              <div
                key={sidebarButton.text}
                className={styles.taskDrawerSidebarButtonWrapper}
                onClick={sidebarButton.action}
              >
                {sidebarButton.icon}
                <Typography.Text>{sidebarButton.text}</Typography.Text>
              </div>
            </Tooltip>
          ) : (
            <Popconfirm
              title={sidebarButton.confirmDeleteTitle}
              onConfirm={sidebarButton.action}
            >
              <div
                key={sidebarButton.text}
                className={`${styles.taskDrawerSidebarButtonWrapper} ${
                  isDeleteEntityLoading &&
                  styles.taskDrawerSidebarDisabledDeleteButton
                }`}
              >
                {sidebarButton.icon}
                <Typography.Text>{sidebarButton.text}</Typography.Text>
              </div>
            </Popconfirm>
          )}
        </>
      ))}
    </div>
  );
};
