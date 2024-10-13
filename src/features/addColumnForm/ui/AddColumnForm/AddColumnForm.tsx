import { Button, Form } from "antd";

import { useFormsAddQuery } from "shared/lib/hooks/use-forms-add-query";
import { useGetColumnFields } from "shared/lib/hooks/use-get-column-fields";
import { IColumn } from "shared/types/IColumn";
import { IProject } from "shared/types/IProject";

import styles from "./AddColumnForm.module.scss";
import { useAddColumnMutation } from "../../api/add-column-form-api";

interface IAddColumnFormProps {
  projectData?: IProject;
  handleCloseAddForm: () => void;
}

export const AddColumnForm = (props: IAddColumnFormProps) => {
  const { projectData, handleCloseAddForm } = props;

  const { FormFields } = useGetColumnFields({ isEdit: false, isAdd: true });

  const {
    handleAddEntityFinish,
    handleDeleteEntityFinishFailed,
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
      onFinishFailed={handleDeleteEntityFinishFailed}
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
