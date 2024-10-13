import { Form, Input } from "antd";

import { commentFieldsDataIndexes, commentFieldsPlaceholders } from "shared/consts/comment-list-fields";
import { IComment } from "shared/types/IComment";

import { useContexts } from "./use-contexts";

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
