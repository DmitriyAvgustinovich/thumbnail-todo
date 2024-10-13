import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";

import { useFormsUpdateQuery } from "shared/lib/hooks/use-forms-update-query";
import { useGetAuthFields } from "shared/lib/hooks/use-get-auth-fields";
import { useGetAuthUser } from "shared/lib/hooks/use-get-auth-user";
import { IUser } from "shared/types/IUser";

import { AccountFieldsSkeleton } from "widgets/Account/ui/Account/AccountSkeleton";

import styles from "./EditAccountForm.module.scss";
import { useUpdateUserMutation } from "../../api/edit-account-form";

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
    handleDeleteEntityFinishFailed,
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
      onFinishFailed={handleDeleteEntityFinishFailed}
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
