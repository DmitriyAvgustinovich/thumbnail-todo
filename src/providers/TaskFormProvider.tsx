import React from "react";

interface ITaskFormContextProps {
  isTaskTitleEditFormVisible: boolean;
  handleOpenTaskTitleEditForm: () => void;
  handleCloseTaskTitleEditForm: () => void;
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
  isTaskTitleEditFormVisible: false,
  handleOpenTaskTitleEditForm: () => {},
  handleCloseTaskTitleEditForm: () => {},
  markdownDescriptionValue: "",
  setMarkdownDescriptionDefaultValue: () => {},
  onChangeMarkdownDescriptionValue: () => {},
  markdownCommentValue: "",
  setMarkdownCommentDefaultValue: () => {},
  onChangeMarkdownCommentValue: () => {},
});

interface ITaskFormProviderProps {
  children: React.ReactNode;
}

export const TaskFormProvider = (props: ITaskFormProviderProps) => {
  const { children } = props;

  const [isTaskTitleEditFormVisible, setIsTaskTitleEditFormVisible] =
    React.useState(false);

  const [markdownDescriptionValue, setMarkdownDescriptionValue] =
    React.useState("");

  const [markdownCommentValue, setMarkdownCommentValue] = React.useState("");

  const handleOpenTaskTitleEditForm = () => {
    setIsTaskTitleEditFormVisible(true);
  };

  const handleCloseTaskTitleEditForm = () => {
    setIsTaskTitleEditFormVisible(false);
  };

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

  return (
    <TaskFormContext.Provider
      value={{
        isTaskTitleEditFormVisible,
        handleOpenTaskTitleEditForm,
        handleCloseTaskTitleEditForm,
        markdownDescriptionValue,
        setMarkdownDescriptionDefaultValue,
        onChangeMarkdownDescriptionValue,
        markdownCommentValue,
        setMarkdownCommentDefaultValue,
        onChangeMarkdownCommentValue,
      }}
    >
      {children}
    </TaskFormContext.Provider>
  );
};
