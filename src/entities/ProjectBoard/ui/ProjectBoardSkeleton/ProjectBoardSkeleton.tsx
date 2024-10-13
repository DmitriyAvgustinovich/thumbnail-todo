import ContentLoader from "react-content-loader";

export const ProjectBoardSkeleton = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height="661"
    viewBox="0 0 100% 661"
    backgroundColor="var(--skeleton-color)"
    foregroundColor="var(--animated-skeleton-color)"
  >
    <rect x="15" y="5" rx="4" ry="4" width="200" height="30" />
    <rect x="1140" y="0" rx="4" ry="4" width="35" height="35" />
    <rect x="15" y="70" rx="4" ry="4" width="100%" height="661" />
  </ContentLoader>
);
