import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { IAdditionalParams } from "shared/types/IAdditionalParams";

import { useGetQueryMessages } from "./use-get-query-messages";
import { getValidateMessage } from "../utils/get-validate-message";

interface IUseFormsAddQuery {
  useAddEntityMutation: any;
  handleCloseAddForm?: () => void;
  successMutationMessage: string;
  additionalParams?: IAdditionalParams;
}

export const useFormsAddQuery = <TFormValues>(args: IUseFormsAddQuery) => {
  const {
    useAddEntityMutation,
    handleCloseAddForm,
    successMutationMessage,
    additionalParams,
  } = args;

  const [
    addEntity,
    {
      isSuccess: isAddEntitySuccess,
      isLoading: isAddEntityLoading,
      status: addEntityStatus,
      error: addEntityError,
    },
  ] = useAddEntityMutation();

  const handleAddEntityFinish = (formValues: TFormValues) => {
    if (additionalParams) {
      const addedData = {
        ...formValues,
        ...additionalParams.fields,
      };

      addEntity(addedData);
    } else {
      addEntity(formValues);
    }
  };

  const handleDeleteEntityFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  useGetQueryMessages({
    isSuccess: isAddEntitySuccess,
    isLoading: isAddEntityLoading,
    status: addEntityStatus,
    error: addEntityError,
    successMessage: successMutationMessage,
    actionOnSuccess: () => handleCloseAddForm?.(),
  });

  return {
    handleAddEntityFinish,
    handleDeleteEntityFinishFailed,
    isAddEntityLoading,
    isAddEntitySuccess,
  };
};
