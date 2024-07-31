import { Form, Input } from "antd";

import {
  commentFieldsDataIndexes,
  commentFieldsPlaceholders,
} from "constants/comment/comment-list-fields";

import { useContexts } from "hooks/general/use-contexts";

import { IComment } from "types/IComment";

interface IUseGetCommentFieldsArgs {
  formValues?: IComment;
}

export const useGetCommentFields = (args: IUseGetCommentFieldsArgs) => {
  const { formValues } = args;

  const {
    taskFormContext: { markdownCommentValue, onChangeMarkdownCommentValue },
  } = useContexts();

  const commentFieldsArray = [
    {
      name: commentFieldsDataIndexes.comment,
      node: (
        <Input.TextArea
          placeholder={commentFieldsPlaceholders.comment}
          value={markdownCommentValue}
          defaultValue={formValues?.comment}
          onChange={onChangeMarkdownCommentValue}
          autoSize
          size="large"
        />
      ),
    },
  ];

  const FormFields = commentFieldsArray.map((field) => (
    <Form.Item {...field} key={field.name} style={{ marginBottom: 0 }}>
      {field.node}
    </Form.Item>
  ));

  return { FormFields };
};
