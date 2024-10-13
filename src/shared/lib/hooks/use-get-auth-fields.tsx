import { Form, Input } from "antd";

import { RouterPath } from "shared/config/route-config";
import {
  authFieldsDataIndexes,
  authFieldsPlaceholders,
  authFieldsTitles,
} from "shared/consts/auth-list-fields";
import { DEFAULT_VALIDATE_MESSAGE } from "shared/consts/general";
import { IUser } from "shared/types/IUser";
import { UploadButton } from "shared/ui/UploadButton/UploadButton";

interface IUseGetAuthFieldsArgs {
  formValues?: IUser;
  isEdit: boolean;
  imageUrl?: string;
  setImageUrl?: (imageUrl: string) => void;
}

export const useGetAuthFields = (args: IUseGetAuthFieldsArgs) => {
  const { formValues, isEdit, imageUrl, setImageUrl } = args;

  const location = window.location.pathname;
  const isAccountPage = location === RouterPath.account;

  const registerFieldsArray = [
    {
      label: authFieldsTitles.avatarUrl,
      name: authFieldsDataIndexes.avatarUrl,
      node: (
        <UploadButton
          disabled={!isEdit}
          imageUrl={imageUrl ?? ""}
          setImageUrl={setImageUrl}
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
