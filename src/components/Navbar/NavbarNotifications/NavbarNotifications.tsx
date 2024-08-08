import React from "react";

import { NotificationOutlined } from "@ant-design/icons";
import { Button, Popover, Tooltip, Typography } from "antd";

import { useGetNotificationsByProjectIdQuery } from "store/api/notifications/notifications-api";

import styles from "./NavbarNotifications.module.scss";
import { Notification } from "./Notification/Notification";

export const NavbarNotifications = () => {
  const projectId =
    window.location.pathname.match(/\/projects\/(\d+)/)?.[1] ?? "";

  const { data: allNotificationsData } = useGetNotificationsByProjectIdQuery({
    projectId,
  });

  const popoverContent = React.useMemo(() => {
    if (!projectId) {
      return (
        <div className={styles.navbarNotificationsPopoverWrapper}>
          <Typography.Text>
            Notifications are not available on any other page except for the
            board of a specific project, go to the project in which you
            participate.
          </Typography.Text>
        </div>
      );
    } else if (!allNotificationsData?.length) {
      return <Typography.Text>No notifications.</Typography.Text>;
    } else {
      return allNotificationsData.map((notification) => (
        <Notification key={notification.id} notificationData={notification} />
      ));
    }
  }, [allNotificationsData, projectId]);

  return (
    <Popover content={popoverContent} title="Notifications" trigger="click">
      <Tooltip title="Notifications">
        <Button type="primary" icon={<NotificationOutlined />} />
      </Tooltip>
    </Popover>
  );
};
