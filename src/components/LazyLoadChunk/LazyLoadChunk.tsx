import React from "react";

import { Spinner } from "components/Spinner/Spinner";

interface ILazyLoadChunkProps {
  children: React.ReactNode;
}

export const LazyLoadChunk = (props: ILazyLoadChunkProps) => {
  const { children } = props;

  return <React.Suspense fallback={<Spinner />}>{children}</React.Suspense>;
};
