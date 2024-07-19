import React from "react";

interface ITaskFormContextProps {
  isAddTaskFormVisible: boolean;
  handleOpenAddTaskForm: () => void;
  handleCloseAddTaskForm: () => void;
  isTaskTitleEditFormVisible: boolean;
  handleOpenTaskTitleEditForm: () => void;
  handleCloseTaskTitleEditForm: () => void;
  markdownDescriptionValue: string;
  handleSetMarkdownDescriptionDefaultValue: (
    markdownDescriptionDefaultValue: string
  ) => void;
  onChangeMarkdownDescriptionValue: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  markdownCommentValue: string;
  handleSetMarkdownCommentDefaultValue: (
    markdownCommentDefaultValue: string
  ) => void;
  onChangeMarkdownCommentValue: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export const TaskFormContext = React.createContext<ITaskFormContextProps>({
  isAddTaskFormVisible: false,
  handleOpenAddTaskForm: () => {},
  handleCloseAddTaskForm: () => {},
  isTaskTitleEditFormVisible: false,
  handleOpenTaskTitleEditForm: () => {},
  handleCloseTaskTitleEditForm: () => {},
  markdownDescriptionValue: "",
  handleSetMarkdownDescriptionDefaultValue: () => {},
  onChangeMarkdownDescriptionValue: () => {},
  markdownCommentValue: "",
  handleSetMarkdownCommentDefaultValue: () => {},
  onChangeMarkdownCommentValue: () => {},
});

interface ITaskFormProviderProps {
  children: React.ReactNode;
}

export const TaskFormProvider = (props: ITaskFormProviderProps) => {
  const { children } = props;

  const [isAddTaskFormVisible, setIsAddTaskFormVisible] = React.useState(false);

  const [isTaskTitleEditFormVisible, setIsTaskTitleEditFormVisible] =
    React.useState(false);

  const [markdownDescriptionValue, setMarkdownDescriptionValue] =
    React.useState("");

  const [markdownCommentValue, setMarkdownCommentValue] = React.useState("");

  const handleOpenAddTaskForm = () => {
    setIsAddTaskFormVisible(true);
  };

  const handleCloseAddTaskForm = () => {
    setIsAddTaskFormVisible(false);
  };

  const handleOpenTaskTitleEditForm = () => {
    setIsTaskTitleEditFormVisible(true);
  };

  const handleCloseTaskTitleEditForm = () => {
    setIsTaskTitleEditFormVisible(false);
  };

  const handleSetMarkdownDescriptionDefaultValue = (
    markdownDescriptionDefaultValue: string
  ) => {
    setMarkdownDescriptionValue(markdownDescriptionDefaultValue);
  };

  const onChangeMarkdownDescriptionValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMarkdownDescriptionValue(event.target.value);
  };

  const handleSetMarkdownCommentDefaultValue = (
    markdownCommentValue: string
  ) => {
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
        isAddTaskFormVisible,
        handleOpenAddTaskForm,
        handleCloseAddTaskForm,
        isTaskTitleEditFormVisible,
        handleOpenTaskTitleEditForm,
        handleCloseTaskTitleEditForm,
        markdownDescriptionValue,
        handleSetMarkdownDescriptionDefaultValue,
        onChangeMarkdownDescriptionValue,
        markdownCommentValue,
        handleSetMarkdownCommentDefaultValue,
        onChangeMarkdownCommentValue,
      }}
    >
      {children}
    </TaskFormContext.Provider>
  );
};
