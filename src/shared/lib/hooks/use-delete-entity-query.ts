import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { useGetQueryMessages } from "./use-get-query-messages";
import { getValidateMessage } from "../utils/get-validate-message";

interface IUseDeleteEntityQueryArgs {
  useDeleteQueryMutation: any;
  deleteSuccessAction?: () => void;
  entityDataIdField: string;
  entityDataId: string;
  successMutationMessage: string;
}

export const useDeleteEntityQuery = (args: IUseDeleteEntityQueryArgs) => {
  const {
    useDeleteQueryMutation,
    deleteSuccessAction,
    entityDataIdField,
    entityDataId,
    successMutationMessage,
  } = args;

  const [
    deleteEntity,
    {
      isSuccess: isDeleteEntitySuccess,
      isLoading: isDeleteEntityLoading,
      status: deleteEntityStatus,
      error: deleteEntityError,
    },
  ] = useDeleteQueryMutation();

  const handleDeleteEntityFinish = () => {
    const deletedData = {
      [entityDataIdField]: entityDataId,
    };

    deleteEntity(deletedData);
  };

  const handleDeleteEntityFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  useGetQueryMessages({
    isSuccess: isDeleteEntitySuccess,
    isLoading: isDeleteEntityLoading,
    status: deleteEntityStatus,
    error: deleteEntityError,
    successMessage: successMutationMessage,
    actionOnSuccess: () => deleteSuccessAction?.(),
  });

  return {
    handleDeleteEntityFinish,
    handleDeleteEntityFinishFailed,
    isDeleteEntityLoading,
    isDeleteEntitySuccess,
  };
};
