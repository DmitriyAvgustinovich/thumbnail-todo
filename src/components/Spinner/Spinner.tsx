import { Spin } from "antd";

import styles from "./Spinner.module.scss";

export const Spinner = () => {
  return <Spin className={styles.spinnerWrapper} size="large" />;
};
