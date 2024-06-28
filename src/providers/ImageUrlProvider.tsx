import React from "react";

interface IImageContextProps {
  newImageUrl: string | null;
  setNewImageUrl: (newImageUrl: string | null) => void;
  uploadImagePath: string;
  setUploadImagePath: (uploadImagePath: string) => void;
}

export const ImageUrlContext = React.createContext<
  IImageContextProps | undefined
>(undefined);

interface IImageUrlProviderProps {
  children: React.ReactNode;
}

export const ImageUrlProvider = ({ children }: IImageUrlProviderProps) => {
  const [newImageUrl, setNewImageUrl] = React.useState<string | null>(null);
  const [uploadImagePath, setUploadImagePath] = React.useState("");

  return (
    <ImageUrlContext.Provider
      value={{ newImageUrl, setNewImageUrl, uploadImagePath, setUploadImagePath }}
    >
      {children}
    </ImageUrlContext.Provider>
  );
};
