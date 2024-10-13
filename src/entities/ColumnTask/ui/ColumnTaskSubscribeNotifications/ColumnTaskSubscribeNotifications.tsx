import { EyeOutlined } from "@ant-design/icons";
import { Button, Tooltip, Typography } from "antd";

import styles from "./ColumnTaskSubscribeNotifications.module.scss";

export const ColumnTaskSubscribeNotifications = () => {
  return (
    <Tooltip
      title="Subscribe to notifications about updates to this task."
      placement="rightBottom"
    >
      <div className={styles.columnTaskSubscribeNotificationsWrapper}>
        <Typography.Text className={styles.columnTaskSubscribeNotificationsText}>
          Notifications
        </Typography.Text>

        <Button type="primary" icon={<EyeOutlined />}>
          Subscribe
        </Button>
      </div>
    </Tooltip>
  );
};
