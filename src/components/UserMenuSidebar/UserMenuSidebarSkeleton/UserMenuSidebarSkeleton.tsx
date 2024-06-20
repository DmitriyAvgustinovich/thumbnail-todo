import ContentLoader from "react-content-loader";

import styles from "./UserMenuSidebarSkeleton.module.scss";

export const UserMenuSidebarSkeleton = () => (
  <div className={styles.userMenuSidebarSkeletonWrapper}>
    <ContentLoader
      speed={2}
      width={200}
      height={150} 
      viewBox="0 0 200 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="102" cy="64" r="32" />
      <rect x="10" y="110" rx="3" ry="3" width="180" height="24" />{" "}
      <rect x="10" y="140" rx="3" ry="3" width="180" height="12" />{" "}
    </ContentLoader>
  </div>
);
