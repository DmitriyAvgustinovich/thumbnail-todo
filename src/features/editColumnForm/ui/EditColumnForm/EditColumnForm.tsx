import { Form } from "antd";

import { useFormsUpdateQuery } from "shared/lib/hooks/use-forms-update-query";
import { useGetColumnFields } from "shared/lib/hooks/use-get-column-fields";
import { IColumn } from "shared/types/IColumn";

import { useUpdateColumnMutation } from "../../api/edit-column-form-api";

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
    handleDeleteEntityFinishFailed,
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
      onFinishFailed={handleDeleteEntityFinishFailed}
    >
      {FormFields}
    </Form>
  );
};
