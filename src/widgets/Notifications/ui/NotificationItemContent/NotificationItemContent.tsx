import { Typography } from "antd";

import { INotification } from "shared/types/INotification";

import styles from "./NotificationItemContent.module.scss";
import { NotificationItem } from "../NotificationItem/NotificationItem";

interface INotificationItemContentProps {
  projectId: string;
  notificationsData: INotification[];
}

export const NotificationItemContent = (
  props: INotificationItemContentProps
) => {
  const { projectId, notificationsData } = props;

  return (() => {
    if (!projectId) {
      return (
        <div
          className={
            styles.notificationItemContentNotAvailableMessageWrapper
          }
        >
          <Typography.Text>
            Notifications are not available on any other page except for the
            board of a specific project, go to the project in which you
            participate.
          </Typography.Text>
        </div>
      );
    } else if (!notificationsData?.length) {
      return <Typography.Text>No notifications.</Typography.Text>;
    } else {
      return (
        <div className={styles.notificationItemContentWrapper}>
          {notificationsData.map((notificationItem) => (
            <NotificationItem
              key={notificationItem.id}
              notificationData={notificationItem}
            />
          ))}
        </div>
      );
    }
  })();
};
