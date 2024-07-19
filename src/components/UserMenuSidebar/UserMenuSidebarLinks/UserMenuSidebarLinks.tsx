import { Link } from "react-router-dom";

import {
  AppstoreAddOutlined,
  ExclamationOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { RouterPath } from "configs/route-config";

import styles from "./UserMenuSidebarLinks.module.scss";

export const UserMenuSidebarLinks = () => {
  const menuLinksArray = [
    {
      key: "0",
      name: "Account",
      path: RouterPath.account,
      icon: <UserOutlined className={styles.userMenuSidebarLinkIcon} />,
    },
    {
      key: "1",
      name: "Dashboard",
      path: RouterPath.dashboard,
      icon: <AppstoreAddOutlined className={styles.userMenuSidebarLinkIcon} />,
    },
    {
      key: "2",
      name: "Vital Task",
      path: RouterPath.vital_task,
      icon: <ExclamationOutlined className={styles.userMenuSidebarLinkIcon} />,
    },
    {
      key: "3",
      name: "Projects",
      path: RouterPath.projects,
      icon: <ProjectOutlined className={styles.userMenuSidebarLinkIcon} />,
    },
  ];

  return menuLinksArray.map((link) => {
    const location = window.location.pathname;
    const isActiveLink = location === link.path;

    return (
      <Link to={link.path} key={link.key}>
        <div
          className={`${styles.userMenuSidebarLinkWrapper} ${
            isActiveLink
              ? styles.userMenuSidebarActiveLink
              : styles.userMenuSidebarNotActiveLink
          }`}
        >
          {link.icon}
          {link.name}
        </div>
      </Link>
    );
  });
};
