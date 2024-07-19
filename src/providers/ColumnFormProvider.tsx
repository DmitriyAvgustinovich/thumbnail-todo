import React from "react";

interface IImageContextProps {
  isAddColumnFormVisible: boolean;
  handleOpenAddColumnForm: () => void;
  handleCloseAddColumnForm: () => void;
}

export const ColumnFormContext = React.createContext<IImageContextProps>({
  isAddColumnFormVisible: false,
  handleOpenAddColumnForm: () => {},
  handleCloseAddColumnForm: () => {},
});

interface IColumnFormProviderProps {
  children: React.ReactNode;
}

export const ColumnFormProvider = (props: IColumnFormProviderProps) => {
  const { children } = props;

  const [isAddColumnFormVisible, setIsAddColumnFormVisible] =
    React.useState(false);

  const handleOpenAddColumnForm = () => {
    setIsAddColumnFormVisible(true);
  };

  const handleCloseAddColumnForm = () => {
    setIsAddColumnFormVisible(false);
  };

  return (
    <ColumnFormContext.Provider
      value={{
        isAddColumnFormVisible,
        handleOpenAddColumnForm,
        handleCloseAddColumnForm,
      }}
    >
      {children}
    </ColumnFormContext.Provider>
  );
};
