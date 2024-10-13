import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";

import { IUser } from "shared/types/IUser";

import styles from "./UserInListBlock.module.scss";

interface IUserInListBlockProps {
  children: React.ReactNode;
  userData?: IUser;
}

export const UserInListBlock = (props: IUserInListBlockProps) => {
  const { children, userData } = props;

  return (
    <div className={styles.userInListBlockWrapper}>
      {userData?.avatarUrl ? (
        <img
          className={styles.userInListBlockAvatar}
          src={userData?.avatarUrl}
          alt=""
        />
      ) : (
        <Avatar
          className={styles.userInListBlockAvatar}
          icon={<UserOutlined />}
        />
      )}

      <Typography.Text className={styles.userInListBlockName}>
        {userData?.name} {userData?.surname}
      </Typography.Text>

      {children}
    </div>
  );
};
