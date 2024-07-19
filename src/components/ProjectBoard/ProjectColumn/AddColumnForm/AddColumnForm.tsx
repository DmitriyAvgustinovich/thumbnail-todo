import { Button, Form } from "antd";

import { useAddColumnMutation } from "store/api/columns/columns-api";

import { useGetColumnFields } from "hooks/columns/use-get-column-fields";
import { useContexts } from "hooks/general/use-contexts";
import { useFormsAddQuery } from "hooks/general/use-forms-add-query";

import { IColumn } from "types/IColumn";

import styles from "./AddColumnForm.module.scss";

interface IAddColumnFormProps {
  projectId?: string;
}

export const AddColumnForm = (props: IAddColumnFormProps) => {
  const { projectId } = props;

  const {
    columnFromContext: { handleCloseAddColumnForm },
  } = useContexts();

  const { FormFields } = useGetColumnFields({ isEdit: false });

  const {
    handleAddEntityFinish,
    handleMutationEntityFinishFailed,
    isAddEntityLoading,
  } = useFormsAddQuery<IColumn>({
    useAddEntityMutation: useAddColumnMutation,
    handleCloseAddForm: handleCloseAddColumnForm,
    successMutationMessage: "Column added successfully",
    additionalParams: {
      fields: {
        projectId,
      },
    },
  });

  return (
    <div className={styles.addColumnFormWrapper}>
      <Form
        className={styles.addColumnForm}
        layout="vertical"
        onFinish={handleAddEntityFinish}
        onFinishFailed={handleMutationEntityFinishFailed}
      >
        {FormFields}

        <Button
          type="primary"
          htmlType="submit"
          loading={isAddEntityLoading}
        >
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
