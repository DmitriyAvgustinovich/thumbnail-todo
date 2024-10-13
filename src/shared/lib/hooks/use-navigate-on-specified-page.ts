import React from "react";

import { useNavigate } from "react-router-dom";

interface IUseNavigateSpecifiedPageArgs {
  isQuerySuccess: boolean;
  pageString: string;
}

export const useNavigateSpecifiedPage = (
  args: IUseNavigateSpecifiedPageArgs
) => {
  const { isQuerySuccess, pageString } = args;

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isQuerySuccess) {
      navigate(pageString);
    }
  }, [isQuerySuccess, navigate, pageString]);
};
