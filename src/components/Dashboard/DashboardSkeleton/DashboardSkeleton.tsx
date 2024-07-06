import ContentLoader from "react-content-loader";

export const DashboardSkeleton = () => (
  <ContentLoader
    speed={2}
    width="150"
    height="30"
    viewBox="0 0 150 30"
    backgroundColor="var(--skeleton-color)"
    foregroundColor="var(--animated-skeleton-color)"
  >
    <rect x="0" y="0" rx="3" ry="3" width="150" height="30" />
  </ContentLoader>
);
