import React from "react";

import { ImageUrlContext } from "providers/ImageUrlProvider";

export const useGetImageUrl = () => {
  const imageUrlContextObj = React.useContext(ImageUrlContext);

  if (!imageUrlContextObj) {
    throw new Error("useImage must be used within an ImageProvider");
  }

  return imageUrlContextObj;
};
