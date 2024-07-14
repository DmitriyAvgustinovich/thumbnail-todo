import React from "react";

interface IEntityFormContextProps {
  isAddColumnFormVisible: boolean;
  handleOpenAddColumnForm: () => void;
  handleCloseAddColumnForm: () => void;
  isAddTaskFormVisible: boolean;
  handleOpenAddTaskForm: () => void;
  handleCloseAddTaskForm: () => void;
  isTaskTitleEditFormVisible: boolean;
  handleOpenTaskTitleEditForm: () => void;
  handleCloseTaskTitleEditForm: () => void;
  isTaskDescriptionEditFormVisible: boolean;
  handleOpenTaskDescriptionEditForm: () => void;
  handleCloseTaskDescriptionEditForm: () => void;
}

export const EntityFormContext = React.createContext<IEntityFormContextProps>({
  isAddColumnFormVisible: false,
  handleOpenAddColumnForm: () => {},
  handleCloseAddColumnForm: () => {},
  isAddTaskFormVisible: false,
  handleOpenAddTaskForm: () => {},
  handleCloseAddTaskForm: () => {},
  isTaskTitleEditFormVisible: false,
  handleOpenTaskTitleEditForm: () => {},
  handleCloseTaskTitleEditForm: () => {},
  isTaskDescriptionEditFormVisible: false,
  handleOpenTaskDescriptionEditForm: () => {},
  handleCloseTaskDescriptionEditForm: () => {},
});

interface IEntityFormProviderProps {
  children: React.ReactNode;
}

export const EntityFormProvider = (props: IEntityFormProviderProps) => {
  const { children } = props;

  const [isAddColumnFormVisible, setIsAddColumnFormVisible] =
    React.useState(false);

  const [isAddTaskFormVisible, setIsAddTaskFormVisible] = React.useState(false);

  const [isTaskTitleEditFormVisible, setIsTaskTitleEditFormVisible] =
    React.useState(false);

  const [
    isTaskDescriptionEditFormVisible,
    setIsTaskDescriptionEditFormVisible,
  ] = React.useState(false);

  const handleOpenAddColumnForm = () => {
    setIsAddColumnFormVisible(true);
  };

  const handleCloseAddColumnForm = () => {
    setIsAddColumnFormVisible(false);
  };

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

  const handleOpenTaskDescriptionEditForm = () => {
    setIsTaskDescriptionEditFormVisible(true);
  };

  const handleCloseTaskDescriptionEditForm = () => {
    setIsTaskDescriptionEditFormVisible(false);
  };

  return (
    <EntityFormContext.Provider
      value={{
        isAddColumnFormVisible,
        handleOpenAddColumnForm,
        handleCloseAddColumnForm,
        isAddTaskFormVisible,
        handleOpenAddTaskForm,
        handleCloseAddTaskForm,
        isTaskTitleEditFormVisible,
        handleOpenTaskTitleEditForm,
        handleCloseTaskTitleEditForm,
        isTaskDescriptionEditFormVisible,
        handleOpenTaskDescriptionEditForm,
        handleCloseTaskDescriptionEditForm,
      }}
    >
      {children}
    </EntityFormContext.Provider>
  );
};
