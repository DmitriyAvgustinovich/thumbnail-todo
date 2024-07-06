import React from "react";

interface IUseGetPaginatedData<T> {
  currentPage: number;
  pageSize: number;
  data?: T[];
}

export const useGetPaginatedData = <T>(args: IUseGetPaginatedData<T>) => {
  const { currentPage, pageSize, data } = args;

  const paginatedTableData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return data?.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  return { paginatedTableData };
};
