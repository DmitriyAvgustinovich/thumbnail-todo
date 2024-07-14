import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { getValidateMessage } from "utils/auth/get-validate-message";

import { useGetQueryMessages } from "./use-get-query-messages";

interface IUseDeleteEntityQueryArgs<TEntityData> {
  useDeleteQueryMutation: any;
  deleteSuccessAction?: () => void;
  entityData?: TEntityData;
  successMutationMessage: string;
}

export const useDeleteEntityQuery = <TEntityData>(
  args: IUseDeleteEntityQueryArgs<TEntityData>
) => {
  const {
    useDeleteQueryMutation,
    deleteSuccessAction,
    entityData,
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
      id: entityData?.id,
    };

    deleteEntity(deletedData);
  };

  const handleMutationEntityFinishFailed = (error: ValidateErrorEntity) => {
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
    handleMutationEntityFinishFailed,
    isDeleteEntityLoading,
    isDeleteEntitySuccess,
  };
};
