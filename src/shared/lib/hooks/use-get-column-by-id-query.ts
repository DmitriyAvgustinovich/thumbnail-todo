import { rtkApi } from "shared/api/rtk-api";
import { IColumn } from "shared/types/IColumn";

type TGetColumnByIdResponse = IColumn;
interface IGetColumnByIdRequest {
  id: string;
}

const getColumnByIdApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getColumnById: build.query<TGetColumnByIdResponse, IGetColumnByIdRequest>({
      query: (body) => `columns/${body.id}`,
      providesTags: ["Columns"],
    }),
  }),
});

export const { useGetColumnByIdQuery } = getColumnByIdApi;
