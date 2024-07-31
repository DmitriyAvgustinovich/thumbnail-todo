import ContentLoader from "react-content-loader";

import styles from "./DashboardSkeleton.module.scss";

export const DashboardSkeleton = () => (
  <div className={styles.dashboardSkeletonWrapper}>
    <ContentLoader
      speed={2}
      width="340"
      height="520"
      viewBox="0 0 340 520"
      backgroundColor="var(--skeleton-color)"
      foregroundColor="var(--animated-skeleton-color)"
    >
      <rect x="0" y="0" rx="10" ry="10" width="340" height="520" />
    </ContentLoader>

    <ContentLoader
      speed={2}
      width="340"
      height="520"
      viewBox="0 0 340 520"
      backgroundColor="var(--skeleton-color)"
      foregroundColor="var(--animated-skeleton-color)"
    >
      <rect x="0" y="0" rx="10" ry="10" width="340" height="520" />
    </ContentLoader>

    <ContentLoader
      speed={2}
      width="340"
      height="520"
      viewBox="0 0 340 520"
      backgroundColor="var(--skeleton-color)"
      foregroundColor="var(--animated-skeleton-color)"
    >
      <rect x="0" y="0" rx="10" ry="10" width="340" height="520" />
    </ContentLoader>
  </div>
);
