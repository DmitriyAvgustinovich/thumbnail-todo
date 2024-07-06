import React from "react";

interface IAddColumnFormContextProps {
  isAddColumnFormVisible: boolean;
  handleOpenAddColumnForm: () => void;
  handleCloseAddColumnForm: () => void;
  isColumnHasBeenAdded: boolean;
  handleColumnHasBeenAdded: () => void;
  handleColumnHasBeenNotAdded: () => void;
}

export const AddColumnFormContext =
  React.createContext<IAddColumnFormContextProps>({
    isAddColumnFormVisible: false,
    handleOpenAddColumnForm: () => {},
    handleCloseAddColumnForm: () => {},
    isColumnHasBeenAdded: false,
    handleColumnHasBeenAdded: () => {},
    handleColumnHasBeenNotAdded: () => {},
  });

interface IAddColumnFormProviderProps {
  children: React.ReactNode;
}

export const AddColumnFormProvider = (props: IAddColumnFormProviderProps) => {
  const { children } = props;

  const [isAddColumnFormVisible, setIsAddColumnFormVisible] =
    React.useState(false);

  const [isColumnHasBeenAdded, setIsColumnHasBeenAdded] = React.useState(false);

  const handleOpenAddColumnForm = () => {
    setIsAddColumnFormVisible(true);
  };

  const handleCloseAddColumnForm = () => {
    setIsAddColumnFormVisible(false);
  };

  const handleColumnHasBeenAdded = () => {
    setIsColumnHasBeenAdded(true);
  };

  const handleColumnHasBeenNotAdded = () => {
    setIsColumnHasBeenAdded(false);
  };

  return (
    <AddColumnFormContext.Provider
      value={{
        isAddColumnFormVisible,
        handleOpenAddColumnForm,
        handleCloseAddColumnForm,
        isColumnHasBeenAdded,
        handleColumnHasBeenAdded,
        handleColumnHasBeenNotAdded,
      }}
    >
      {children}
    </AddColumnFormContext.Provider>
  );
};
