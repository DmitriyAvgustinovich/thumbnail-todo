import { LoadingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

import { RouterPath } from "shared/config/route-config";
import { useGetQueryMessages } from "shared/lib/hooks/use-get-query-messages";
import { useNavigateSpecifiedPage } from "shared/lib/hooks/use-navigate-on-specified-page";

import styles from "./UserMenuSidebar.module.scss";
import { useSignOutMutation } from "../../api/user-menu-sidebar-api";
import { UserMenuSidebarLinks } from "../UserMenuSidebarLinks/UserMenuSidebarLinks";

export const UserMenuSidebar = () => {
  const [
    signOut,
    {
      isSuccess: isSignOutSuccess,
      isLoading: isSignOutLoading,
      status: signOutStatus,
      error: signOutError,
    },
  ] = useSignOutMutation();

  const handleSignOut = () => {
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
      <UserMenuSidebarLinks />

      <Popconfirm
        title="Are you sure you want to log out of your account?"
        okText="Yes"
        cancelText="No"
        onConfirm={handleSignOut}
      >
        <div className={styles.menuLinkLogoutWrapper}>
          {isSignOutLoading ? (
            <LoadingOutlined className={styles.menuLinkLogoutIcon} />
          ) : (
            <LogoutOutlined className={styles.menuLinkLogoutIcon} />
          )}
          Logout
        </div>
      </Popconfirm>
    </div>
  );
};
