import { Button, Form } from "antd";

import { RouterPath } from "shared/config/route-config";
import { useFormsAddQuery } from "shared/lib/hooks/use-forms-add-query";
import { useGetAuthFields } from "shared/lib/hooks/use-get-auth-fields";
import { useNavigateSpecifiedPage } from "shared/lib/hooks/use-navigate-on-specified-page";
import { IUser } from "shared/types/IUser";

import { useSignInMutation } from "../../api/auth-api";

export const AuthLogin = () => {
  const { LoginFields } = useGetAuthFields({ isEdit: true });

  const {
    handleAddEntityFinish,
    handleDeleteEntityFinishFailed,
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
      onFinishFailed={handleDeleteEntityFinishFailed}
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
