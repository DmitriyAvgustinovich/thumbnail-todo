import ContentLoader from "react-content-loader";

export const ProjectContributorsSkeleton = () => (
  <ContentLoader
    speed={2}
    width="150"
    height="35"
    viewBox="0 0 150 35"
    backgroundColor="var(--skeleton-color)"
    foregroundColor="var(--animated-skeleton-color)"
  >
    <rect x="0" y="0" rx="10" ry="10" width="150" height="35" />
  </ContentLoader>
);
