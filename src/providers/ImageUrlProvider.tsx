import React from "react";

interface IImageContextProps {
  imageUrl: string | null;
  setImageUrl: (imageUrl: string | null) => void;
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
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [uploadImagePath, setUploadImagePath] = React.useState("");

  return (
    <ImageUrlContext.Provider
      value={{ imageUrl, setImageUrl, uploadImagePath, setUploadImagePath }}
    >
      {children}
    </ImageUrlContext.Provider>
  );
};
