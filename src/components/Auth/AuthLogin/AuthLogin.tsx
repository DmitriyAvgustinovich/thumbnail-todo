import { Button, Form } from "antd";

import { useSignInMutation } from "store/api/auth/auth-api";

import { RouterPath } from "configs/route-config";

import { useGetAuthFields } from "hooks/auth/use-get-auth-fields";
import { useFormsAddQuery } from "hooks/general/use-forms-add-query";
import { useNavigateSpecifiedPage } from "hooks/general/use-navigate-on-specified-page";

import { IUser } from "types/IUser";

export const AuthLogin = () => {
  const { LoginFields } = useGetAuthFields({ isEdit: true });

  const {
    handleAddEntityFinish,
    handleMutationEntityFinishFailed,
    isAddEntityLoading,
    isAddEntitySuccess,
  } = useFormsAddQuery<IUser>({
    useAddEntityMutation: useSignInMutation,
    successMutationMessage: "Sign in successful",
  });

  useNavigateSpecifiedPage({
    isQuerySuccess: isAddEntitySuccess,
    pageString: RouterPath.dashboard,
  });

  return (
    <Form
      layout="vertical"
      onFinish={handleAddEntityFinish}
      onFinishFailed={handleMutationEntityFinishFailed}
    >
      {LoginFields}

      <Button
        htmlType="submit"
        type="primary"
        size="large"
        loading={isAddEntityLoading}
      >
        Sign In
      </Button>
    </Form>
  );
};
