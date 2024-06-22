import { CalendarOutlined, NotificationOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip, Typography } from "antd";

import { RouterPath } from "configs/route-config";

import { getCurrentDateInNavbar } from "utils/general/get-current-date-in-navbar";

import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const { dayOfWeek, formattedDate } = getCurrentDateInNavbar();
  const location = window.location.pathname;

  const navbarTitle = () => {
    switch (location) {
      case RouterPath.dashboard:
        return (
          <>
            <span className={styles.navbarTitleColorPiece}>Dash</span>board
          </>
        );

      case RouterPath.vital_task:
        return (
          <>
            <span className={styles.navbarTitleColorPiece}>To</span>-Do
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.navbarWrapper}>
      <h1 className={styles.navbarTitle}>{navbarTitle()}</h1>

      <Input.Search
        className={styles.navbarSearchInput}
        placeholder="Search your task here..."
        enterButton
      />

      <div className={styles.navbarIconsWrapper}>
        <Tooltip title="Notifications">
          <Button type="primary" icon={<NotificationOutlined />} />
        </Tooltip>

        <Tooltip title="Calendar">
          <Button type="primary" icon={<CalendarOutlined />} />
        </Tooltip>
      </div>

      <div>
        <Typography.Text className={styles.navbarDayOfWeekDate}>
          {dayOfWeek}
        </Typography.Text>

        <br />

        <Typography.Text className={styles.navbarCurrentFormattedDate}>
          {formattedDate}
        </Typography.Text>
      </div>
    </div>
  );
};
