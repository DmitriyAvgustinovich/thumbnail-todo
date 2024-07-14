import { Button, Form, Modal } from "antd";

import { useUpdateColumnMutation } from "store/api/columns/columns-api";

import { useGetColumnFields } from "hooks/columns/use-get-column-fields";
import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";

import { IColumn } from "types/IColumn";

interface IEditColumnModalProps {
  isEditColumnModalOpen: boolean;
  handleCloseEditColumnModal: () => void;
  columnData?: IColumn;
}

export const EditColumnModal = (props: IEditColumnModalProps) => {
  const { isEditColumnModalOpen, handleCloseEditColumnModal, columnData } =
    props;

  const { FormFields } = useGetColumnFields({
    formValues: columnData,
    isEdit: true,
  });

  const timeoutCloseEditColumnModal = () => {
    setTimeout(() => handleCloseEditColumnModal(), 1000);
  };

  const {
    handleUpdateEntityFinish,
    handleMutationEntityFinishFailed,
    isUpdateEntityLoading,
  } = useFormsUpdateQuery<IColumn, IColumn>({
    useUpdateQueryMutation: useUpdateColumnMutation,
    handleCloseUpdateForm: timeoutCloseEditColumnModal,
    entityData: columnData,
    successMutationMessage: "Column updated successfully",
  });

  return (
    <Modal
      title="Edit Column"
      open={isEditColumnModalOpen}
      onCancel={handleCloseEditColumnModal}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleUpdateEntityFinish}
        onFinishFailed={handleMutationEntityFinishFailed}
      >
        {FormFields}

        <Button
          type="primary"
          htmlType="submit"
          loading={isUpdateEntityLoading}
        >
          Done
        </Button>
      </Form>
    </Modal>
  );
};
