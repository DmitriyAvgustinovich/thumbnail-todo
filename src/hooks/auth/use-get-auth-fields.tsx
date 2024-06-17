import {
  LockOutlined,
  MailOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input } from "antd";

import {
  authFieldsDataIndexes,
  authFieldsPlaceholders,
  authFieldsTitles,
} from "constants/auth/auth-list-fields";
import { DEFAULT_VALIDATE_MESSAGE } from "constants/general";

export const useGetAuthFields = () => {
  const registerFieldsArray = [
    {
      label: authFieldsTitles.firstName,
      name: authFieldsDataIndexes.firstName,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} имя`,
        },
      ],
      node: (
        <Input
          prefix={<UserAddOutlined />}
          placeholder={authFieldsPlaceholders.firstName}
        />
      ),
    },
    {
      label: authFieldsTitles.lastName,
      name: authFieldsDataIndexes.lastName,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} фамилия`,
        },
      ],
      node: (
        <Input
          prefix={<UserDeleteOutlined />}
          placeholder={authFieldsPlaceholders.lastName}
        />
      ),
    },
    {
      label: authFieldsTitles.userName,
      name: authFieldsDataIndexes.username,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} имя пользователя`,
        },
      ],
      node: (
        <Input
          prefix={<UserOutlined />}
          placeholder={authFieldsPlaceholders.userName}
        />
      ),
    },
    {
      label: authFieldsTitles.email,
      name: authFieldsDataIndexes.email,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} почта`,
        },
      ],
      node: (
        <Input
          prefix={<MailOutlined />}
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
          message: `${DEFAULT_VALIDATE_MESSAGE} пароль`,
        },
      ],
      node: (
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={authFieldsPlaceholders.password}
        />
      ),
    },
  ];

  const RegisterFields = registerFieldsArray.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  const loginFieldsArray = [
    {
      label: authFieldsTitles.userName,
      name: authFieldsDataIndexes.username,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} имя пользователя`,
        },
      ],
      node: (
        <Input
          prefix={<UserOutlined />}
          placeholder={authFieldsPlaceholders.userName}
        />
      ),
    },
    {
      label: authFieldsTitles.password,
      name: authFieldsDataIndexes.password,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} пароль`,
        },
      ],
      node: (
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={authFieldsPlaceholders.password}
        />
      ),
    },
  ];

  const LoginFields = loginFieldsArray.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  return { RegisterFields, LoginFields };
};
