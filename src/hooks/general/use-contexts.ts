import React from "react";

import { ColumnFormContext } from "providers/ColumnFormProvider";
import { ImageUrlContext } from "providers/ImageUrlProvider";
import { TaskFormContext } from "providers/TaskFormProdiver";

export const useContexts = () => {
  const imageUrlContext = React.useContext(ImageUrlContext);
  const columnFromContext = React.useContext(ColumnFormContext);
  const taskFormContext = React.useContext(TaskFormContext);

  return {
    imageUrlContext,
    columnFromContext,
    taskFormContext,
  };
};
