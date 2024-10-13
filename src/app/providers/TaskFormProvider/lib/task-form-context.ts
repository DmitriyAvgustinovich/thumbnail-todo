import React from "react";

interface ITaskFormContextProps {
  markdownDescriptionValue: string;
  setMarkdownDescriptionDefaultValue: (
    markdownDescriptionDefaultValue: string
  ) => void;
  onChangeMarkdownDescriptionValue: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  markdownCommentValue: string;
  setMarkdownCommentDefaultValue: (markdownCommentDefaultValue: string) => void;
  onChangeMarkdownCommentValue: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export const TaskFormContext = React.createContext<ITaskFormContextProps>({
  markdownDescriptionValue: "",
  setMarkdownDescriptionDefaultValue: () => {},
  onChangeMarkdownDescriptionValue: () => {},
  markdownCommentValue: "",
  setMarkdownCommentDefaultValue: () => {},
  onChangeMarkdownCommentValue: () => {},
});
