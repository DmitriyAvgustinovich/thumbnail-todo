import { FileImageOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";

import styles from "./SidebarCoverAction.module.scss";

export const SidebarCoverAction = () => {
  return (
    <Tooltip title="Add or remove cover to this task" placement="left">
      <div className={styles.sidebarCoverActionButtonWrapper}>
        <FileImageOutlined />
        <Typography.Text>Cover</Typography.Text>
      </div>
    </Tooltip>
  );
};
