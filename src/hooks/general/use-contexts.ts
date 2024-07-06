import React from "react";

import { AddColumnFormContext } from "providers/AddColumnFormProvider";
import { ImageUrlContext } from "providers/ImageUrlProvider";

export const useContexts = () => {
  const imageUrlContext = React.useContext(ImageUrlContext);
  const addColumnFormContext = React.useContext(AddColumnFormContext);

  return {
    imageUrlContext,
    addColumnFormContext,
  };
};
