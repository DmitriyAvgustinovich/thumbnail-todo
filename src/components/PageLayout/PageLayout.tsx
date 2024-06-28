import { UserMenuSidebar } from "components/UserMenuSidebar/UserMenuSidebar";

import styles from "./PageLayout.module.scss";

interface IPageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = (props: IPageLayoutProps) => {
  const { children } = props;

  return (
    <div className={styles.pageLayoutWrapper}>
      <UserMenuSidebar />
      <div className={styles.pageLayoutChildrenWrapper}>{children}</div>
    </div>
  );
};
