import { rtkApi } from "shared/api/rtk-api";
import { IComment } from "shared/types/IComment";

type TAddCommentResponse = IComment;
type TAddCommentRequest = IComment;

const addCommentFormApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    addComment: build.mutation<TAddCommentResponse, TAddCommentRequest>({
      query: (body) => ({
        url: "comments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useAddCommentMutation } = addCommentFormApi;
