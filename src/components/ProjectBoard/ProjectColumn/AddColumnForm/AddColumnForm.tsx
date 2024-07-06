import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { Button, Form } from "antd";

import { useAddColumnMutation } from "store/api/columns/columns-api";

import { useGetColumnFields } from "hooks/columns/use-get-column-fields";
import { useContexts } from "hooks/general/use-contexts";

import { getValidateMessage } from "utils/auth/get-validate-message";

import { IColumn } from "types/IColumn";

import styles from "./AddColumnForm.module.scss";

interface IAddColumnFormProps {
  projectId?: string;
}

export const AddColumnForm = (props: IAddColumnFormProps) => {
  const { projectId } = props;

  const {
    addColumnFormContext: {
      handleCloseAddColumnForm,
      handleColumnHasBeenAdded,
    },
  } = useContexts();

  const [addColumn] = useAddColumnMutation();

  const { FormFields } = useGetColumnFields({ isEdit: false });

  const handleAddColumnFinish = (formValues: IColumn) => {
    const addedData = {
      ...formValues,
      projectId,
    };

    addColumn(addedData);
    handleCloseAddColumnForm();
    handleColumnHasBeenAdded();
  };

  const handleAddColumnFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  return (
    <div className={styles.addColumnFormWrapper}>
      <Form
        className={styles.addColumnForm}
        layout="vertical"
        onFinish={handleAddColumnFinish}
        onFinishFailed={handleAddColumnFinishFailed}
      >
        {FormFields}

        <Button type="primary" htmlType="submit">
          Add List
        </Button>

        <Button
          className={styles.addColumnFormCancelButton}
          onClick={handleCloseAddColumnForm}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};
