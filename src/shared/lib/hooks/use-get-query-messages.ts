import React from "react";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { SerializedError } from "@reduxjs/toolkit";
import { message } from "antd";

import { queryStatuses } from "shared/consts/general";

interface IUseGetQueryMessagesArgs {
  isSuccess: boolean;
  isLoading: boolean;
  status: string;
  error: FetchBaseQueryError | SerializedError | undefined;
  successMessage: string;
  actionOnSuccess?: () => void;
}

export const useGetQueryMessages = (args: IUseGetQueryMessagesArgs) => {
  const {
    isSuccess,
    isLoading,
    status,
    error,
    successMessage,
    actionOnSuccess,
  } = args;

  React.useEffect(() => {
    if (isSuccess && !isLoading && status === queryStatuses.fulfilled) {
      message.success(successMessage);
      actionOnSuccess?.();
    }

    if (!isSuccess && !isLoading && status === queryStatuses.rejected) {
      message.error(error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSuccess, status, error]);
};
