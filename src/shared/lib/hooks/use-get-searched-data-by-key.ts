import { useMemo } from "react";

interface IUseGetSearchedDataByKeyArgs<TData> {
  data: TData[];
  searchValue: string;
  searchKey: string;
}

export const useGetSearchedDataByKey = <TData>(
  args: IUseGetSearchedDataByKeyArgs<TData>
) => {
  const { data, searchValue, searchKey } = args;

  const searchedData = useMemo(() => {
    if (!searchValue) {
      return data;
    }

    return data.filter((obj) => {
      return (obj as { [key: string]: string })[searchKey]
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
  }, [searchValue, data, searchKey]);

  return { searchedData };
};
