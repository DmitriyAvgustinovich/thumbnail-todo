import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import styles from "./WriteCommentBlock.module.scss";

interface IWriteCommentBlockProps {
  handleAddFormVisible: () => void;
}

export const WriteCommentBlock = (props: IWriteCommentBlockProps) => {
  const { handleAddFormVisible } = props;

  const { authUser } = useGetAuthUser();

  return (
    <div className={styles.writeCommentWrapper}>
      {authUser?.avatarUrl ? (
        <img
          className={styles.writeCommentUserAvatar}
          src={authUser?.avatarUrl}
          alt=""
        />
      ) : (
        <Avatar
          className={styles.writeCommentUserAvatar}
          icon={<UserOutlined />}
        />
      )}

      <div
        className={styles.writeCommentTextWrapper}
        onClick={handleAddFormVisible}
      >
        <Typography.Text className={styles.writeCommentText}>
          Write a comment...
        </Typography.Text>
      </div>
    </div>
  );
};
