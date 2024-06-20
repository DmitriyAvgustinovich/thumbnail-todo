import { Link } from "react-router-dom";

import { AppstoreAddOutlined, ExclamationOutlined } from "@ant-design/icons";

import { RouterPath } from "configs/route-config";

import { TObjWithStringValues } from "types/TObjWithStringValues";

export const getMenuLinks = (styles: TObjWithStringValues) => {
  const menuLinksArray = [
    {
      key: "0",
      name: "Dashboard",
      path: RouterPath.dashboard,
      icon: <AppstoreAddOutlined className={styles.menuIcon} />,
    },
    {
      key: "1",
      name: "Vital Task",
      path: RouterPath.vital_task,
      icon: <ExclamationOutlined className={styles.menuIcon} />,
    },
  ];

  const MenuLinks = menuLinksArray.map((link) => {
    const location = window.location.pathname;
    const isActiveLink = location === link.path;

    return (
      <Link to={link.path} key={link.key}>
        <div
          className={`${styles.menuLinkWrapper} ${
            isActiveLink ? styles.menuActiveLink : styles.menuNotActiveLink
          }`}
        >
          {link.icon}
          {link.name}
        </div>
      </Link>
    );
  });

  return { MenuLinks };
};
