import { LogoutOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

import { useSignOutMutation } from "store/api/auth/auth-api";

import { RouterPath } from "configs/route-config";

import { useGetQueryMessages } from "hooks/general/use-get-query-messages";
import { useNavigateSpecifiedPage } from "hooks/general/use-navigate-on-specified-page";

import styles from "./UserMenuSidebar.module.scss";
import { UserMenuSidebarLinks } from "./UserMenuSidebarLinks/UserMenuSidebarLinks";

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
      <UserMenuSidebarLinks />

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
