import { rtkApi } from "shared/api/rtk-api";

type TDeleteCommentResponse = void;
interface IDeleteCommentRequest {
  id: string;
}

const columnTaskCommentApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    deleteComment: build.mutation<
      TDeleteCommentResponse,
      IDeleteCommentRequest
    >({
      query: (body) => ({
        url: `comments/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useDeleteCommentMutation } = columnTaskCommentApi;
