import { rtkApi } from "shared/api/rtk-api";
import { IComment } from "shared/types/IComment";

type TUpdateCommentResponse = IComment;
interface IUpdateCommentRequest extends IComment {
  id: string;
}

const editCommentFormApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateComment: build.mutation<
      TUpdateCommentResponse,
      IUpdateCommentRequest
    >({
      query: (body) => ({
        url: `comments/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useUpdateCommentMutation } = editCommentFormApi;
