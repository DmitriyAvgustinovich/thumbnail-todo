import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Spin, Typography } from "antd";

import { AdditionalActionsPopoverContent } from "components/AdditionalActionsPopoverContent/AdditionalActionsPopoverContent";

import { useDeleteColumnMutation } from "store/api/columns/columns-api";
import { useGetTasksByColumnIdQuery } from "store/api/tasks/tasks-api";

import { useContexts } from "hooks/general/use-contexts";
import { useDeleteEntityQuery } from "hooks/general/use-delete-entity-query";

import { IColumn } from "types/IColumn";

import { AddTaskForm } from "./AddTaskForm/AddTaskForm";
import { ColumnTask } from "./ColumnTask/ColumnTask";
import { EditColumnModal } from "./EditColumnModal/EditColumnModal";
import styles from "./ProjectColumn.module.scss";

interface IProjectColumnProps {
  columnData?: IColumn;
}

export const ProjectColumn = (props: IProjectColumnProps) => {
  const { columnData } = props;

  const [isEditColumnModalOpen, setIsEditColumnModalOpen] =
    React.useState(false);

  const handleOpenEditColumnModal = () => {
    setIsEditColumnModalOpen(true);
  };

  const handleCloseEditColumnModal = () => {
    setIsEditColumnModalOpen(false);
  };

  const {
    entityFormContext: { isAddTaskFormVisible, handleOpenAddTaskForm },
  } = useContexts();

  const { data: columnTasksData, isLoading: isColumnTasksDataLoading } =
    useGetTasksByColumnIdQuery({
      columnId: columnData?.id ?? "",
    });

  const { handleDeleteEntityFinish } = useDeleteEntityQuery<IColumn>({
    useDeleteQueryMutation: useDeleteColumnMutation,
    entityData: columnData,
    successMutationMessage: "Column deleted successfully",
  });

  return (
    <>
      <div className={styles.projectColumnWrapper}>
        <div className={styles.projectColumnHeaderWrapper}>
          <Typography.Text className={styles.projectColumnTitle}>
            {columnData?.title}
          </Typography.Text>

          <AdditionalActionsPopoverContent
            confirmDeleteTitle="Are you sure you want to delete this column and tasks in it?"
            handleDeleteAction={handleDeleteEntityFinish}
            handleOpenEditModal={handleOpenEditColumnModal}
            placement="bottomLeft"
            isExistHiddenButton
          />
        </div>

        {isColumnTasksDataLoading ? (
          <Spin className={styles.projectColumnSpinner} />
        ) : (
          columnTasksData?.map((task) => <ColumnTask taskData={task} />)
        )}

        {!isAddTaskFormVisible ? (
          <Button
            className={styles.addTaskButtonWrapper}
            icon={<PlusOutlined />}
            onClick={handleOpenAddTaskForm}
            loading={isColumnTasksDataLoading}
            type="primary"
            block
          >
            Add task
          </Button>
        ) : (
          <AddTaskForm
            projectId={columnData?.projectId ?? ""}
            columnId={columnData?.id ?? ""}
          />
        )}
      </div>

      <EditColumnModal
        isEditColumnModalOpen={isEditColumnModalOpen}
        handleCloseEditColumnModal={handleCloseEditColumnModal}
        columnData={columnData}
      />
    </>
  );
};
