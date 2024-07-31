import { Button, Form } from "antd";

import { useAddColumnMutation } from "store/api/columns/columns-api";

import { useGetColumnFields } from "hooks/columns/use-get-column-fields";
import { useFormsAddQuery } from "hooks/general/use-forms-add-query";

import { IColumn } from "types/IColumn";
import { IProject } from "types/IProject";

import styles from "./AddColumnForm.module.scss";

interface IAddColumnFormProps {
  projectData?: IProject;
  handleCloseAddForm: () => void;
}

export const AddColumnForm = (props: IAddColumnFormProps) => {
  const { projectData, handleCloseAddForm } = props;

  const { FormFields } = useGetColumnFields({ isEdit: false });

  const {
    handleAddEntityFinish,
    handleMutationEntityFinishFailed,
    isAddEntityLoading,
  } = useFormsAddQuery<IColumn>({
    useAddEntityMutation: useAddColumnMutation,
    handleCloseAddForm: handleCloseAddForm,
    successMutationMessage: "Column added successfully",
    additionalParams: {
      fields: {
        projectId: projectData?.id,
      },
    },
  });

  return (
    <Form
      className={styles.addColumnForm}
      layout="vertical"
      onFinish={handleAddEntityFinish}
      onFinishFailed={handleMutationEntityFinishFailed}
    >
      {FormFields}

      <div className={styles.addColumnFormButtonsWrapper}>
        <Button type="primary" htmlType="submit" loading={isAddEntityLoading}>
          Add List
        </Button>

        <Button onClick={handleCloseAddForm}>Cancel</Button>
      </div>
    </Form>
  );
};
