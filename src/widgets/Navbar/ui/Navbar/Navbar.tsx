import { CalendarOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip, Typography } from "antd";

import { RouterPath } from "shared/config/route-config";
import { getCurrentDateInNavbar } from "shared/lib/utils/get-current-date-in-navbar";

import styles from "./Navbar.module.scss";
import { Notifications } from "../../../Notifications";

export const Navbar = () => {
  const { dayOfWeek, formattedDate } = getCurrentDateInNavbar();

  const location = window.location.pathname;

  const NavbarTitle = (() => {
    switch (location) {
      case RouterPath.dashboard:
        return (
          <>
            <span className={styles.navbarTitleColorPiece}>Dash</span>board
          </>
        );
      case RouterPath.account:
        return (
          <>
            <span className={styles.navbarTitleColorPiece}>Acc</span>ount
          </>
        );
      case RouterPath.projects:
        return (
          <>
            <span className={styles.navbarTitleColorPiece}>Proj</span>ects
          </>
        );
      default:
        return (
          <>
            <span className={styles.navbarTitleColorPiece}>Thumbnail</span>Todo
          </>
        );
    }
  })();

  return (
    <div className={styles.navbarWrapper}>
      <h1 className={styles.navbarTitle}>{NavbarTitle}</h1>

      <Input.Search
        className={styles.navbarSearchInput}
        placeholder="Search..."
        enterButton
      />

      <div className={styles.navbarIconsWrapper}>
        <Notifications />

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
