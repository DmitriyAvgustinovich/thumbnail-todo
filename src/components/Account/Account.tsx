import React from "react";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Typography } from "antd";

import { PageLayout } from "components/PageLayout/PageLayout";

import { useUpdateUserMutation } from "store/api/users/users-api";

import { useGetAuthFields } from "hooks/auth/use-get-auth-fields";
import { useContexts } from "hooks/general/use-contexts";
import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { IUser } from "types/IUser";

import styles from "./Account.module.scss";
import {
  AccountFieldsSkeleton,
  AccountMainInfoSkeleton,
} from "./AccountSkeleton/AccountSkeleton";

export const Account = () => {
  const [isEdit, setIsEdit] = React.useState(false);

  const {
    imageUrlContext: { uploadImagePath },
  } = useContexts();

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  const { authUser, isAuthUserLoading, refetchAuthUser } = useGetAuthUser();

  const { RegisterFields } = useGetAuthFields({
    formValues: authUser,
    handleCancelEdit,
    isEdit,
  });

  const {
    handleUpdateEntityFinish,
    handleMutationEntityFinishFailed,
    isUpdateEntityLoading,
  } = useFormsUpdateQuery<IUser, IUser>({
    useUpdateQueryMutation: useUpdateUserMutation,
    successMutationMessage: "User updated successfully",
    entityData: authUser,
    additionalParams: {
      fields: {
        avatarUrl: uploadImagePath,
      },
      refetchData: refetchAuthUser,
      closeEdit: handleCancelEdit,
    },
  });

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

        <Form
          className={styles.accountListFieldsWrapper}
          layout="vertical"
          onFinish={handleUpdateEntityFinish}
          onFinishFailed={handleMutationEntityFinishFailed}
        >
          {isAuthUserLoading ? <AccountFieldsSkeleton /> : RegisterFields}

          {isEdit && (
            <Button
              className={styles.saveEditMainInfoButton}
              htmlType="submit"
              type="primary"
              loading={isUpdateEntityLoading}
            >
              Save
            </Button>
          )}

          {isEdit ? (
            <Button type="primary" onClick={handleCancelEdit}>
              Cancel
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleEdit}
              loading={isUpdateEntityLoading}
            >
              Update Info
            </Button>
          )}
        </Form>
      </div>
    </PageLayout>
  );
};
