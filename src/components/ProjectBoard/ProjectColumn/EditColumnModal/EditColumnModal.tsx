import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { Button, Form, Modal } from "antd";

import { useUpdateColumnMutation } from "store/api/columns/columns-api";

import { useGetColumnFields } from "hooks/columns/use-get-column-fields";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

import { getValidateMessage } from "utils/auth/get-validate-message";

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

  const [
    updateColumn,
    {
      isSuccess: isUpdateColumnSuccess,
      isLoading: isUpdateColumnLoading,
      status: updateColumnStatus,
      error: updateColumnError,
    },
  ] = useUpdateColumnMutation();

  const handleUpdateColumnFinish = (formValues: IColumn) => {
    const updatedData = {
      ...formValues,
      id: columnData?.id,
    };

    updateColumn(updatedData);
    setTimeout(() => handleCloseEditColumnModal(), 1000);
  };

  const handleAddColumnFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  useGetQueryMessages({
    isSuccess: isUpdateColumnSuccess,
    isLoading: isUpdateColumnLoading,
    status: updateColumnStatus,
    error: updateColumnError,
    successMessage: "Column updated successfully",
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
        onFinish={handleUpdateColumnFinish}
        onFinishFailed={handleAddColumnFinishFailed}
      >
        {FormFields}

        <Button
          type="primary"
          htmlType="submit"
          loading={isUpdateColumnLoading}
        >
          Done
        </Button>
      </Form>
    </Modal>
  );
};
