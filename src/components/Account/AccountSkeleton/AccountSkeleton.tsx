import ContentLoader from "react-content-loader";

export const AccountFieldsSkeleton = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height="340"
    viewBox="0 0 1000 340"
    backgroundColor="var(--skeleton-color)"
    foregroundColor="var(--animated-skeleton-color)"
  >
    <rect x="0" y="10" rx="3" ry="3" width="100" height="15" />
    <rect x="0" y="36" rx="3" ry="3" width="1000" height="35" />
    <rect x="0" y="93" rx="3" ry="3" width="100" height="15" />
    <rect x="0" y="119" rx="3" ry="3" width="1000" height="35" />
    <rect x="0" y="176" rx="3" ry="3" width="100" height="15" />
    <rect x="0" y="202" rx="3" ry="3" width="1000" height="35" />
    <rect x="0" y="259" rx="3" ry="3" width="100" height="15" />
    <rect x="0" y="285" rx="3" ry="3" width="1000" height="35" />
  </ContentLoader>
);

export const AccountMainInfoSkeleton = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height="140"
    viewBox="0 0 1000 140"
    backgroundColor="var(--skeleton-color)"
    foregroundColor="var(--animated-skeleton-color)"
  >
    <circle cx="48" cy="88" r="48" />
    <rect x="112" y="65" rx="3" ry="3" width="200" height="25" />
    <rect x="112" y="100" rx="3" ry="3" width="250" height="20" />
  </ContentLoader>
);
