import { ArrowsAltOutlined, ClearOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip, Typography } from "antd";

import { useBatchMultipleDeleteEntityQuery } from "shared/lib/hooks/use-batch-multiple-delete-entity-query";
import { INotification } from "shared/types/INotification";

import styles from "./NotificationItemTitle.module.scss";
import {
  useDeleteNotificationMutation,
  useGetNotificationsByProjectIdQuery,
} from "../../api/notifications-api";

interface INotificationItemTitleProps {
  projectId: string;
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export const NotificationItemTitle = (props: INotificationItemTitleProps) => {
  const { projectId, isModalOpen, handleOpenModal } = props;

  const { data: notificationsData, isLoading: isNotificationsDataLoading } =
    useGetNotificationsByProjectIdQuery({
      projectId,
    });

  const notificationsDataLength = notificationsData?.length;

  const {
    handleBatchMultipleDeleteEntityFinish,
    isBatchMultipleDeleteEntityLoading,
  } = useBatchMultipleDeleteEntityQuery<INotification>({
    useDeleteEntityQueryMutation: useDeleteNotificationMutation,
    entityDataIdField: "id",
    dataArray: notificationsData ?? [],
    batchSize: 5,
  });

  const isDeleteAllNotificationsLoading =
    isNotificationsDataLoading || isBatchMultipleDeleteEntityLoading;

  return (
    <div className={styles.notificationItemTitleWrapper}>
      <Typography.Text>Notifications</Typography.Text>

      {projectId && (
        <>
          <Tooltip title="Clear all notifications">
            <Popconfirm
              title="Are you sure you want to delete all notifications?"
              onConfirm={handleBatchMultipleDeleteEntityFinish}
            >
              <Button
                className={styles.notificationItemTitleButton}
                icon={<ClearOutlined />}
                size="small"
                loading={isDeleteAllNotificationsLoading}
                disabled={!notificationsDataLength}
              />
            </Popconfirm>
          </Tooltip>

          {!isModalOpen && (
            <Tooltip title="Open notifications in modal window.">
              <Button
                className={styles.notificationItemTitleButton}
                icon={<ArrowsAltOutlined />}
                size="small"
                onClick={handleOpenModal}
                loading={isDeleteAllNotificationsLoading}
                disabled={!notificationsDataLength}
              />
            </Tooltip>
          )}
        </>
      )}
    </div>
  );
};
