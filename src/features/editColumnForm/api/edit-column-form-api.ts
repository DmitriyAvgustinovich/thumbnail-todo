import { rtkApi } from "shared/api/rtk-api";
import { IColumn } from "shared/types/IColumn";

type TUpdateColumnResponse = IColumn;
interface IUpdateColumnRequest extends IColumn {
  id: string;
}

const editColumnFormApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateColumn: build.mutation<TUpdateColumnResponse, IUpdateColumnRequest>({
      query: (body) => ({
        url: `columns/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Columns"],
    }),
  }),
});

export const { useUpdateColumnMutation } = editColumnFormApi;
