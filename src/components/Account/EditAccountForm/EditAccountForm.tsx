import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";

import { useUpdateUserMutation } from "store/api/users/users-api";

import { useGetAuthFields } from "hooks/auth/use-get-auth-fields";
import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { IUser } from "types/IUser";

import styles from "./EditAccountForm.module.scss";
import { AccountFieldsSkeleton } from "../AccountSkeleton/AccountSkeleton";

interface IEditAccountFormProps {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

export const EditAccountForm = (props: IEditAccountFormProps) => {
  const { isEdit, setIsEdit, imageUrl, setImageUrl } = props;

  const { authUser, isAuthUserLoading, refetchAuthUser } = useGetAuthUser();

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  const { RegisterFields } = useGetAuthFields({
    formValues: authUser,
    isEdit,
    imageUrl,
    setImageUrl,
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
      fields: { avatarUrl: imageUrl },
      refetchData: refetchAuthUser,
      closeEdit: handleCancelEdit,
    },
  });

  return (
    <Form
      className={styles.editAccountFormWrapper}
      layout="vertical"
      onFinish={handleUpdateEntityFinish}
      onFinishFailed={handleMutationEntityFinishFailed}
    >
      {isAuthUserLoading ? <AccountFieldsSkeleton /> : RegisterFields}

      {isEdit && (
        <Button
          className={styles.editAccountFormSaveButton}
          htmlType="submit"
          type="primary"
          loading={isUpdateEntityLoading}
          icon={<CheckOutlined />}
        >
          Save
        </Button>
      )}

      {isEdit ? (
        <Button
          type="primary"
          onClick={handleCancelEdit}
          icon={<CloseOutlined />}
        >
          Cancel
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={handleEdit}
          loading={isUpdateEntityLoading || isAuthUserLoading}
          icon={<EditOutlined />}
        >
          Update Info
        </Button>
      )}
    </Form>
  );
};
