import { Link } from "react-router-dom";

import { Button, Typography } from "antd";

import { RouterPath } from "configs/route-config";

import styles from "./NotAuthorized.module.scss";

export const NotAuthorized = () => {
  return (
    <div className={styles.notAuthorizedWrapper}>
      <Typography.Title className={styles.notAuthorizedTitle} level={3}>
        You are not logged in.
        <br />
        Please log in.
      </Typography.Title>

      <Link className={styles.backToDashboardPageButton} to={RouterPath.auth}>
        <Button type="primary" size="large">
          Log In
        </Button>
      </Link>
    </div>
  );
};
