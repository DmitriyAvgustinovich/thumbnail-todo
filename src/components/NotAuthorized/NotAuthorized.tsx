import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

import { RouterPath } from "configs/route-config";

import styles from "./NotAuthorized.module.scss";

export const NotAuthorized = () => {
  return (
    <div className={styles.notAuthorizedWrapper}>
      <Typography.Title className={styles.notAuthorizedTitle} level={3}>
        Вы не авторизованы.
        <br />
        Пожалуйста, пройдите авторизацию.
      </Typography.Title>

      <Link className={styles.backToDashboardPageButton} to={RouterPath.auth}>
        <Button type="primary" size="large">
          Авторизоваться
        </Button>
      </Link>
    </div>
  );
};
