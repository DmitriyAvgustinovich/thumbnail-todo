import React from "react";

import { TaskFormContext } from "../lib/task-form-context";

interface ITaskFormProviderProps {
  children: React.ReactNode;
}

export const TaskFormProvider = (props: ITaskFormProviderProps) => {
  const { children } = props;

  const [markdownDescriptionValue, setMarkdownDescriptionValue] =
    React.useState("");

  const [markdownCommentValue, setMarkdownCommentValue] = React.useState("");

  const setMarkdownDescriptionDefaultValue = (
    markdownDescriptionDefaultValue: string
  ) => {
    setMarkdownDescriptionValue(markdownDescriptionDefaultValue);
  };

  const onChangeMarkdownDescriptionValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMarkdownDescriptionValue(event.target.value);
  };

  const setMarkdownCommentDefaultValue = (markdownCommentValue: string) => {
    setMarkdownCommentValue(markdownCommentValue);
  };

  const onChangeMarkdownCommentValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMarkdownCommentValue(event.target.value);
  };

  const taskFormContextValue = {
    markdownDescriptionValue,
    setMarkdownDescriptionDefaultValue,
    onChangeMarkdownDescriptionValue,
    markdownCommentValue,
    setMarkdownCommentDefaultValue,
    onChangeMarkdownCommentValue,
  };

  return (
    <TaskFormContext.Provider value={taskFormContextValue}>
      {children}
    </TaskFormContext.Provider>
  );
};
