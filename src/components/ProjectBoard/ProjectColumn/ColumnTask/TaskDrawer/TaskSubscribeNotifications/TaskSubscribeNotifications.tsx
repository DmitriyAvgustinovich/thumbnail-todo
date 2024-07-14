import { EyeOutlined } from "@ant-design/icons";
import { Button, Tooltip, Typography } from "antd";

import styles from "./TaskSubscribeNotifications.module.scss";

export const TaskSubscribeNotifications = () => {
  return (
    <Tooltip
      title="Subscribe to notifications about updates to this task."
      placement="rightBottom"
    >
      <div className={styles.taskSubscribeNotificationsWrapper}>
        <Typography.Text className={styles.taskSubscribeNotificationsText}>
          Notifications
        </Typography.Text>

        <Button type="primary" icon={<EyeOutlined />}>
          Subscribe
        </Button>
      </div>
    </Tooltip>
  );
};
