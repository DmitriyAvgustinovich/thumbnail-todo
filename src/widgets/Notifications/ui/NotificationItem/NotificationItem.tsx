import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Typography } from "antd";

import { useDeleteEntityQuery } from "shared/lib/hooks/use-delete-entity-query";
import { useGetAuthUser } from "shared/lib/hooks/use-get-auth-user";
import { useGetColumnByIdQuery } from "shared/lib/hooks/use-get-column-by-id-query";
import { useGetProjectByIdQuery } from "shared/lib/hooks/use-get-project-by-id-query";
import { INotification } from "shared/types/INotification";

import styles from "./NotificationItem.module.scss";
import { useDeleteNotificationMutation } from "../../api/notifications-api";

interface INotificationProps {
  notificationData: INotification;
}

export const NotificationItem = (props: INotificationProps) => {
  const { notificationData } = props;

  const { authUser } = useGetAuthUser();

  const { data: projectData, isLoading: isProjectDataLoading } =
    useGetProjectByIdQuery({
      id: notificationData.projectId,
    });

  const { data: columnData, isLoading: isColumnDataLoading } =
    useGetColumnByIdQuery({
      id: notificationData.columnId ?? "",
    });

  const { handleDeleteEntityFinish, isDeleteEntityLoading } =
    useDeleteEntityQuery({
      useDeleteQueryMutation: useDeleteNotificationMutation,
      entityDataIdField: "id",
      entityDataId: notificationData.id ?? "",
      successMutationMessage: "NotificationItem deleted successfully",
    });

  const deleteNotificationCondition = authUser?.id === projectData?.adminUserId;

  return (
    <div className={styles.notificationItemWrapper}>
      {deleteNotificationCondition && (
        <Popconfirm
          title="Are you sure you want to delete this notificationItem?"
          onConfirm={handleDeleteEntityFinish}
        >
          <Button
            icon={
              isDeleteEntityLoading ? <LoadingOutlined /> : <DeleteOutlined />
            }
            size="small"
          />
        </Popconfirm>
      )}

      <div className={styles.notificationItemTextWrapper}>
        <Typography.Text className={styles.notificationItemDate} strong>
          {notificationData.createdAt}
        </Typography.Text>

        <Typography.Text>
          {notificationData.title}{" "}
          {isProjectDataLoading ? (
            <LoadingOutlined />
          ) : (
            <b>{projectData?.title}</b>
          )}
        </Typography.Text>

        <Typography.Text>
          {notificationData.message}{" "}
          {isColumnDataLoading ? (
            <LoadingOutlined />
          ) : (
            <b>{columnData?.title}</b>
          )}
        </Typography.Text>
      </div>
    </div>
  );
};
