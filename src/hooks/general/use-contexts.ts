import React from "react";

import { EntityFormContext } from "providers/EntityFormProvider";
import { ImageUrlContext } from "providers/ImageUrlProvider";

export const useContexts = () => {
  const imageUrlContext = React.useContext(ImageUrlContext);
  const entityFormContext = React.useContext(EntityFormContext);

  return {
    imageUrlContext,
    entityFormContext,
  };
};
