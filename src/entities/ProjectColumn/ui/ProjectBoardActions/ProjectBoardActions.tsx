import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Popover } from "antd";

import { useDeleteEntityQuery } from "shared/lib/hooks/use-delete-entity-query";
import { IColumn } from "shared/types/IColumn";

import styles from "./ProjectBoardActions.module.scss";
import { useDeleteColumnMutation } from "../../api/project-column-api";

interface IProjectBoardActionsProps {
  columnData?: IColumn;
  handleOpenEditModal: () => void;
}

export const ProjectBoardActions = (props: IProjectBoardActionsProps) => {
  const { columnData, handleOpenEditModal } = props;

  const { handleDeleteEntityFinish } = useDeleteEntityQuery({
    useDeleteQueryMutation: useDeleteColumnMutation,
    entityDataIdField: "id",
    entityDataId: columnData?.id ?? "",
    successMutationMessage: "Column and tasks deleted successfully",
  });

  const PopoverContent = (
    <div className={styles.projectBoardActionsWrapper}>
      <Button
        className={styles.projectBoardActionsButton}
        icon={<EditOutlined />}
        onClick={handleOpenEditModal}
      >
        Edit column name
      </Button>

      <Popconfirm
        title="Are you sure you want to delete this column and tasks in it?"
        onConfirm={handleDeleteEntityFinish}
      >
        <Button
          className={styles.projectBoardActionsButton}
          icon={<DeleteOutlined />}
        >
          Delete column
        </Button>
      </Popconfirm>
    </div>
  );

  return (
    <Popover content={PopoverContent} placement="bottomRight">
      <EllipsisOutlined className={styles.projectBoardActionsIcon} />
    </Popover>
  );
};
