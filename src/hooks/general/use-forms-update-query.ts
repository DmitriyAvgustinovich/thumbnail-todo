import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { getValidateMessage } from "utils/auth/get-validate-message";

import { IAdditionalParams } from "types/IAdditionalParams";

import { useGetQueryMessages } from "./use-get-query-messages";

interface IUseFormsUpdateQueryArgs<TEntityData> {
  useUpdateQueryMutation: any;
  handleCloseUpdateForm?: () => void;
  entityData?: TEntityData;
  successMutationMessage: string;
  additionalParams?: IAdditionalParams;
}

export const useFormsUpdateQuery = <TFormValues, TEntityData>(
  args: IUseFormsUpdateQueryArgs<TEntityData>
) => {
  const {
    useUpdateQueryMutation,
    handleCloseUpdateForm,
    entityData,
    successMutationMessage,
    additionalParams,
  } = args;

  const [
    updateEntity,
    {
      isSuccess: isUpdateEntitySuccess,
      isLoading: isUpdateEntityLoading,
      status: updateEntityStatus,
      error: updateEntityError,
    },
  ] = useUpdateQueryMutation();

  const handleUpdateEntityFinish = (formValues: TFormValues) => {
    if (additionalParams) {
      const updatedData = {
        ...formValues,
        id: entityData?.id,
        ...additionalParams.fields,
      };

      updateEntity(updatedData);
      additionalParams?.refetchData?.();
      additionalParams?.closeEdit?.();
    } else {
      const updatedData = {
        ...formValues,
        id: entityData?.id,
      };

      updateEntity(updatedData);
    }
  };

  const handleMutationEntityFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  useGetQueryMessages({
    isSuccess: isUpdateEntitySuccess,
    isLoading: isUpdateEntityLoading,
    status: updateEntityStatus,
    error: updateEntityError,
    successMessage: successMutationMessage,
    actionOnSuccess: () => handleCloseUpdateForm?.(),
  });

  return {
    handleUpdateEntityFinish,
    handleMutationEntityFinishFailed,
    isUpdateEntityLoading,
    isUpdateEntitySuccess,
  };
};
