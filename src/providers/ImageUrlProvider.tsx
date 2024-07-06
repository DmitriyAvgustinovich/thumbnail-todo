import React from "react";

interface IImageContextProps {
  newImageUrl: string;
  setNewImageUrl: (newImageUrl: string) => void;
  uploadImagePath: string;
  setUploadImagePath: (uploadImagePath: string) => void;
}

export const ImageUrlContext = React.createContext<IImageContextProps>({
  newImageUrl: "",
  setNewImageUrl: () => {},
  uploadImagePath: "",
  setUploadImagePath: () => {},
});

interface IImageUrlProviderProps {
  children: React.ReactNode;
}

export const ImageUrlProvider = (props: IImageUrlProviderProps) => {
  const { children } = props;

  const [newImageUrl, setNewImageUrl] = React.useState("");
  const [uploadImagePath, setUploadImagePath] = React.useState("");

  return (
    <ImageUrlContext.Provider
      value={{
        newImageUrl,
        setNewImageUrl,
        uploadImagePath,
        setUploadImagePath,
      }}
    >
      {children}
    </ImageUrlContext.Provider>
  );
};
