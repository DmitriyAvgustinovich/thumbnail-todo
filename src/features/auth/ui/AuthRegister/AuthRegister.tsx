import React from "react";

import { Button, Form } from "antd";

import { RouterPath } from "shared/config/route-config";
import { useFormsAddQuery } from "shared/lib/hooks/use-forms-add-query";
import { useGetAuthFields } from "shared/lib/hooks/use-get-auth-fields";
import { useNavigateSpecifiedPage } from "shared/lib/hooks/use-navigate-on-specified-page";
import { IUser } from "shared/types/IUser";

import styles from "./AuthRegister.module.scss";
import { useSignUpMutation } from "../../api/auth-api";

export const AuthRegister = () => {
  const [imageUrl, setImageUrl] = React.useState("");

  const { RegisterFields } = useGetAuthFields({
    isEdit: true,
    imageUrl,
    setImageUrl,
  });

  const {
    handleAddEntityFinish,
    handleDeleteEntityFinishFailed,
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
      onFinishFailed={handleDeleteEntityFinishFailed}
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
