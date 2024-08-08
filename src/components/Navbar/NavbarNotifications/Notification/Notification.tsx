import { Link } from "react-router-dom";

import { ClearOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip, Typography } from "antd";

import { useDeleteNotificationMutation } from "store/api/notifications/notifications-api";
import { useGetProjectByIdQuery } from "store/api/projects/projects-api";

import { RouterPath } from "configs/route-config";

import { useDeleteEntityQuery } from "hooks/general/use-delete-entity-query";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { INotification } from "types/INotification";

import styles from "./Notification.module.scss";

interface INotificationProps {
  notificationData: INotification;
}

export const Notification = (props: INotificationProps) => {
  const { notificationData } = props;

  const { authUser } = useGetAuthUser();

  const { data: projectData, isLoading: isProjectDataLoading } =
    useGetProjectByIdQuery({
      id: notificationData.projectId,
    });

  const { handleDeleteEntityFinish, isDeleteEntityLoading } =
    useDeleteEntityQuery<INotification>({
      useDeleteQueryMutation: useDeleteNotificationMutation,
      entityData: notificationData,
      successMutationMessage: "Notification deleted successfully",
    });

  const deleteNotificationCondition = authUser?.id === projectData?.adminUserId;

  return (
    <div className={styles.notificationWrapper}>
      {deleteNotificationCondition && (
        <Popconfirm
          title="Are you sure you want to hide this notification?"
          onConfirm={handleDeleteEntityFinish}
        >
          <Button
            icon={
              isDeleteEntityLoading ? <LoadingOutlined /> : <ClearOutlined />
            }
            size="small"
          />
        </Popconfirm>
      )}

      <div className={styles.notificationTextWrapper}>
        <Typography.Text className={styles.notificationDate} strong>
          {notificationData.createdAt}
        </Typography.Text>

        <Typography.Text>
          {notificationData.title}{" "}
          {isProjectDataLoading ? (
            <LoadingOutlined />
          ) : (
            <Tooltip title={`Go to the ${projectData?.title}`}>
              <Link to={`${RouterPath.projects}/${projectData?.id}`}>
                <Typography.Text strong>{projectData?.title}</Typography.Text>
              </Link>
            </Tooltip>
          )}
        </Typography.Text>

        <Typography.Text>{notificationData.message}</Typography.Text>
      </div>
    </div>
  );
};
