import ContentLoader from "react-content-loader";

export const TaskCommentsSkeleton = () => (
  <>
    <ContentLoader
      speed={2}
      width="100%"
      height="100"
      viewBox="0 0 400 160"
      backgroundColor="var(--skeleton-color)"
      foregroundColor="var(--animated-skeleton-color)"
    >
      <circle cx="38" cy="38" r="38" />
      <rect x="90" y="0" rx="15" ry="15" width="315" height="140" />
    </ContentLoader>

    <ContentLoader
      speed={2}
      width="100%"
      height="100"
      viewBox="0 0 400 160"
      backgroundColor="var(--skeleton-color)"
      foregroundColor="var(--animated-skeleton-color)"
    >
      <circle cx="38" cy="38" r="38" />
      <rect x="90" y="0" rx="15" ry="15" width="315" height="140" />
    </ContentLoader>

    <ContentLoader
      speed={2}
      width="100%"
      height="100"
      viewBox="0 0 400 160"
      backgroundColor="var(--skeleton-color)"
      foregroundColor="var(--animated-skeleton-color)"
    >
      <circle cx="38" cy="38" r="38" />
      <rect x="90" y="0" rx="15" ry="15" width="315" height="140" />
    </ContentLoader>

    <ContentLoader
      speed={2}
      width="100%"
      height="100"
      viewBox="0 0 400 160"
      backgroundColor="var(--skeleton-color)"
      foregroundColor="var(--animated-skeleton-color)"
    >
      <circle cx="38" cy="38" r="38" />
      <rect x="90" y="0" rx="15" ry="15" width="315" height="140" />
    </ContentLoader>
  </>
);
