import React from "react";

import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Typography } from "antd";

import { PageLayout } from "components/PageLayout/PageLayout";

import { useUpdateUserMutation } from "store/api/users/users-api";

import { useGetAuthFields } from "hooks/auth/use-get-auth-fields";
import { useContexts } from "hooks/general/use-contexts";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { getValidateMessage } from "utils/auth/get-validate-message";

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

  const { authUser, isAuthUserLoading, refetchAuthUser } = useGetAuthUser();
  const { RegisterFields } = useGetAuthFields({
    formValues: authUser,
    isEdit,
  });

  const [
    updateUser,
    {
      isSuccess: isUpdateUserSuccess,
      isLoading: isUpdateUserLoading,
      status: updateUserStatus,
      error: updateUserError,
    },
  ] = useUpdateUserMutation();

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  const handleUpdateUserFinish = (formValues: IUser) => {
    const updatedData = {
      ...formValues,
      id: authUser?.id ?? "",
      avatarUrl: uploadImagePath,
    };

    updateUser(updatedData);
    handleCancelEdit();
    refetchAuthUser();
  };

  const handleUpdateUserFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  useGetQueryMessages({
    isSuccess: isUpdateUserSuccess,
    isLoading: isUpdateUserLoading,
    status: updateUserStatus,
    error: updateUserError,
    successMessage: "User updated successfully",
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
          onFinish={handleUpdateUserFinish}
          onFinishFailed={handleUpdateUserFinishFailed}
        >
          {isAuthUserLoading ? <AccountFieldsSkeleton /> : RegisterFields}

          {isEdit && (
            <Button
              className={styles.saveEditMainInfoButton}
              htmlType="submit"
              type="primary"
              loading={isUpdateUserLoading}
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
              loading={isUpdateUserLoading}
            >
              Update Info
            </Button>
          )}
        </Form>
      </div>
    </PageLayout>
  );
};
