import ContentLoader from "react-content-loader";

import styles from "./UserMenuSidebarSkeleton.module.scss";

export const UserMenuSidebarSkeleton = () => (
  <div className={styles.userMenuSidebarSkeletonWrapper}>
    <ContentLoader
      speed={2}
      width={200}
      height={150}
      viewBox="0 0 200 150"
      backgroundColor="var(--skeleton-color)"
      foregroundColor="var(--animated-skeleton-color)"
    >
      <circle cx="42" cy="64" r="32" />
      <rect x="10" y="110" rx="3" ry="3" width="180" height="16" />
      <rect x="10" y="135" rx="3" ry="3" width="180" height="12" />
    </ContentLoader>
  </div>
);
