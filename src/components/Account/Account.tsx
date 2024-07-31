import React from "react";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";

import { PageLayout } from "components/PageLayout/PageLayout";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./Account.module.scss";
import { AccountMainInfoSkeleton } from "./AccountSkeleton/AccountSkeleton";
import { EditAccountForm } from "./EditAccountForm/EditAccountForm";

export const Account = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");

  const { authUser, isAuthUserLoading } = useGetAuthUser();

  React.useEffect(() => {
    if (authUser?.avatarUrl) {
      setImageUrl(authUser.avatarUrl);
    }
  }, [authUser]);

  return (
    <PageLayout>
      <div className={styles.accountWrapper}>
        <Typography.Text className={styles.accountTitle}>
          Account Information
        </Typography.Text>

        {isAuthUserLoading ? (
          <AccountMainInfoSkeleton />
        ) : (
          <div className={styles.accountMainInfoWrapper}>
            {authUser?.avatarUrl ? (
              <Avatar size={96} src={authUser?.avatarUrl} />
            ) : (
              <Avatar size={96} icon={<UserOutlined />} />
            )}

            <div className={styles.accountMainInfoTextWrapper}>
              <Typography.Text className={styles.accountName}>
                {authUser?.name} {authUser?.surname}
              </Typography.Text>

              <Typography.Text className={styles.accountEmail}>
                {authUser?.email}
              </Typography.Text>
            </div>
          </div>
        )}

        <EditAccountForm
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      </div>
    </PageLayout>
  );
};
