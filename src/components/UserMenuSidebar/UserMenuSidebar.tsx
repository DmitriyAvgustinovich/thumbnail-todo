import { Link } from "react-router-dom";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm, Typography } from "antd";

import { useSignOutMutation } from "store/api/auth/auth-api";

import { RouterPath } from "configs/route-config";

import { useGetQueryMessages } from "hooks/general/use-get-query-messages";
import { useNavigateSpecifiedPage } from "hooks/general/use-navigate-on-specified-page";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { getMenuLinks } from "utils/general/get-menu-links";

import styles from "./UserMenuSidebar.module.scss";
import { UserMenuSidebarSkeleton } from "./UserMenuSidebarSkeleton/UserMenuSidebarSkeleton";

export const UserMenuSidebar = () => {
  const { authUser, isAuthUserLoading } = useGetAuthUser();
  const { MenuLinks } = getMenuLinks(styles);

  const [
    signOut,
    {
      isSuccess: isSignOutSuccess,
      isLoading: isSignOutLoading,
      status: signOutStatus,
      error: signOutError,
    },
  ] = useSignOutMutation();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    signOut();
  };

  useGetQueryMessages({
    isSuccess: isSignOutSuccess,
    isLoading: isSignOutLoading,
    status: signOutStatus,
    error: signOutError,
    successMessage: "You have logged out of your account.",
  });

  useNavigateSpecifiedPage({
    isQuerySuccess: isSignOutSuccess,
    pageString: RouterPath.auth,
  });

  return (
    <div className={styles.userMenuSidebarWrapper}>
      {isAuthUserLoading ? (
        <UserMenuSidebarSkeleton />
      ) : (
        <div className={styles.userBlockWrapper}>
          <Link to={RouterPath.account}>
            <Avatar size={64} icon={<UserOutlined />} />
          </Link>

          <Typography.Text className={styles.userBlockName}>
            {authUser?.name} {authUser?.surname}
          </Typography.Text>

          <Typography.Text className={styles.userBlockEmail}>
            {authUser?.email}
          </Typography.Text>
        </div>
      )}

      <div className={styles.menuLinksWrapper}>{MenuLinks}</div>

      <Popconfirm
        title="Are you sure you want to log out of your account?"
        okText="Yes"
        cancelText="No"
        onConfirm={handleLogout}
      >
        <div className={styles.menuLinkLogoutWrapper}>
          <LogoutOutlined className={styles.menuLinkLogoutIcon} />
          Logout
        </div>
      </Popconfirm>
    </div>
  );
};
