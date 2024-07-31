import React from "react";

import { Button, Form } from "antd";

import { useSignUpMutation } from "store/api/auth/auth-api";

import { RouterPath } from "configs/route-config";

import { useGetAuthFields } from "hooks/auth/use-get-auth-fields";
import { useFormsAddQuery } from "hooks/general/use-forms-add-query";
import { useNavigateSpecifiedPage } from "hooks/general/use-navigate-on-specified-page";

import { IUser } from "types/IUser";

import styles from "./AuthRegister.module.scss";

export const AuthRegister = () => {
  const [imageUrl, setImageUrl] = React.useState("");

  const { RegisterFields } = useGetAuthFields({
    isEdit: true,
    imageUrl,
    setImageUrl,
  });

  const {
    handleAddEntityFinish,
    handleMutationEntityFinishFailed,
    isAddEntityLoading,
    isAddEntitySuccess,
  } = useFormsAddQuery<IUser>({
    useAddEntityMutation: useSignUpMutation,
    successMutationMessage: "Sign up successful",
    additionalParams: {
      fields: {
        avatarUrl: imageUrl,
      },
    },
  });

  useNavigateSpecifiedPage({
    isQuerySuccess: isAddEntitySuccess,
    pageString: RouterPath.dashboard,
  });

  return (
    <Form
      className={styles.authRegisterFormWrapper}
      layout="vertical"
      onFinish={handleAddEntityFinish}
      onFinishFailed={handleMutationEntityFinishFailed}
    >
      {RegisterFields}

      <Button
        htmlType="submit"
        type="primary"
        size="large"
        loading={isAddEntityLoading}
      >
        Sign Up
      </Button>
    </Form>
  );
};
