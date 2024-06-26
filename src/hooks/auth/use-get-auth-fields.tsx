import { Form, Input } from "antd";

import { UploadButton } from "components/UploadButton/UploadButton";

import { useUpdateUserMutation } from "store/api/users/users-api";

import { RouterPath } from "configs/route-config";

import {
  authFieldsDataIndexes,
  authFieldsPlaceholders,
  authFieldsTitles,
} from "constants/auth/auth-list-fields";
import { DEFAULT_VALIDATE_MESSAGE } from "constants/general";

import { useGetQueryMessages } from "hooks/general/use-get-query-messages";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { IUser } from "types/IUser";

interface IUseGetAuthFieldsArgs {
  formValues?: IUser;
  isEdit?: boolean;
}

export const useGetAuthFields = (args: IUseGetAuthFieldsArgs) => {
  const { formValues, isEdit } = args;

  const { authUser, refetchAuthUser } = useGetAuthUser();

  const location = window.location.pathname;
  const isAccountPage = location === RouterPath.account;

  const [
    updateUser,
    {
      isSuccess: isUpdateUserSuccess,
      isLoading: isUpdateUserLoading,
      status: updateUserStatus,
      error: updateUserError,
    },
  ] = useUpdateUserMutation();

  const clearExistedImageUrlCallback = () => {
    const updatedData = {
      ...(formValues as IUser),
      id: authUser?.id ?? "",
      avatarUrl: "",
    };

    updateUser(updatedData);
    refetchAuthUser();
  };

  useGetQueryMessages({
    isSuccess: isUpdateUserSuccess,
    isLoading: isUpdateUserLoading,
    status: updateUserStatus,
    error: updateUserError,
    successMessage: "Image successfully cleared.",
  });

  const registerFieldsArray = [
    {
      label: authFieldsTitles.avatarUrl,
      name: authFieldsDataIndexes.avatarUrl,
      node: (
        <UploadButton
          disabled={!isEdit}
          existedImage={authUser?.avatarUrl}
          clearExistedImageUrlCallback={clearExistedImageUrlCallback}
        />
      ),
    },
    {
      label: authFieldsTitles.name,
      name: authFieldsDataIndexes.name,
      rules: [
        {
          required: !isAccountPage,
          message: `${DEFAULT_VALIDATE_MESSAGE} name`,
        },
      ],
      node: (
        <Input
          defaultValue={formValues?.name}
          placeholder={authFieldsPlaceholders.name}
          disabled={!isEdit}
        />
      ),
    },
    {
      label: authFieldsTitles.surname,
      name: authFieldsDataIndexes.surname,
      rules: [
        {
          required: !isAccountPage,
          message: `${DEFAULT_VALIDATE_MESSAGE} surname`,
        },
      ],
      node: (
        <Input
          defaultValue={formValues?.surname}
          disabled={!isEdit}
          placeholder={authFieldsPlaceholders.surname}
        />
      ),
    },
    {
      label: authFieldsTitles.email,
      name: authFieldsDataIndexes.email,
      rules: [
        {
          required: !isAccountPage,
          message: `${DEFAULT_VALIDATE_MESSAGE} e-mail`,
        },
      ],
      node: (
        <Input
          defaultValue={formValues?.email}
          disabled={!isEdit}
          placeholder={authFieldsPlaceholders.email}
        />
      ),
    },
    {
      label: authFieldsTitles.password,
      name: authFieldsDataIndexes.password,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} password`,
        },
      ],
      node: <Input.Password placeholder={authFieldsPlaceholders.password} />,
    },
  ];

  if (isAccountPage) {
    registerFieldsArray.pop();
  }

  const RegisterFields = registerFieldsArray.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  const loginFieldsArray = [
    {
      label: authFieldsTitles.email,
      name: authFieldsDataIndexes.email,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} e-mail`,
        },
      ],
      node: <Input placeholder={authFieldsPlaceholders.email} />,
    },
    {
      label: authFieldsTitles.password,
      name: authFieldsDataIndexes.password,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} password`,
        },
      ],
      node: <Input.Password placeholder={authFieldsPlaceholders.password} />,
    },
  ];

  const LoginFields = loginFieldsArray.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  return { RegisterFields, LoginFields };
};
