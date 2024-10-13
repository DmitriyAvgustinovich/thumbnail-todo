import { rtkApi } from "shared/api/rtk-api";
import { IColumn } from "shared/types/IColumn";
import { ITask } from "shared/types/ITask";

type TGetColumnsByProjectIdResponse = IColumn[];
interface IGetColumnsByProjectIdRequest {
  projectId: string;
}

type TGetTasksByColumnIdResponse = ITask[];
interface IGetTasksByColumnIdRequest {
  columnId: string;
}

type TDeleteColumnResponse = void;
interface IDeleteColumnRequest {
  id: string;
}

const projectColumnApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getColumnsByProjectId: build.query<
      TGetColumnsByProjectIdResponse,
      IGetColumnsByProjectIdRequest
    >({
      query: (body) => `columns?projectId=${body.projectId}`,
      providesTags: ["Columns"],
    }),

    getTasksByColumnId: build.query<
      TGetTasksByColumnIdResponse,
      IGetTasksByColumnIdRequest
    >({
      query: (body) => ({
        url: `tasks?columnId=${body.columnId}`,
      }),
      providesTags: ["Tasks"],
    }),

    deleteColumn: build.mutation<TDeleteColumnResponse, IDeleteColumnRequest>({
      query: (body) => ({
        url: `columns/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Columns"],
    }),
  }),
});

export const {
  useGetColumnsByProjectIdQuery,
  useGetTasksByColumnIdQuery,
  useDeleteColumnMutation,
} = projectColumnApi;
