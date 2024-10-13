import ContentLoader from "react-content-loader";

import styles from "./NavbarSkeleton.module.scss";

export const NavbarSkeleton = () => (
  <div className={styles.navbarSkeletonWrapper}>
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 100% 100%"
      backgroundColor="var(--skeleton-color)"
      foregroundColor="var(--animated-skeleton-color)"
    >
      <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
    </ContentLoader>
  </div>
);
