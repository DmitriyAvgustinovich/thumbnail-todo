import { Form } from "antd";

import { useUpdateColumnMutation } from "store/api/columns/columns-api";

import { useGetColumnFields } from "hooks/columns/use-get-column-fields";
import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";

import { IColumn } from "types/IColumn";

interface IEditColumnModalProps {
  columnData?: IColumn;
  handleCloseEditForm: () => void;
}

export const EditColumnForm = (props: IEditColumnModalProps) => {
  const { columnData, handleCloseEditForm } = props;

  const timeoutCloseEditForm = () => {
    setTimeout(() => handleCloseEditForm(), 1000);
  };

  const {
    handleUpdateEntityFinish,
    handleMutationEntityFinishFailed,
    isUpdateEntityLoading,
  } = useFormsUpdateQuery<IColumn, IColumn>({
    useUpdateQueryMutation: useUpdateColumnMutation,
    handleCloseUpdateForm: timeoutCloseEditForm,
    entityData: columnData,
    successMutationMessage: "Column updated successfully",
  });

  const { FormFields } = useGetColumnFields({
    formValues: columnData,
    isEdit: true,
    isLoadingState: isUpdateEntityLoading,
    handleCloseEditForm: handleCloseEditForm,
  });

  return (
    <Form
      layout="vertical"
      onFinish={handleUpdateEntityFinish}
      onFinishFailed={handleMutationEntityFinishFailed}
    >
      {FormFields}
    </Form>
  );
};
