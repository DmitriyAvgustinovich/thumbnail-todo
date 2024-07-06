import React from "react";

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Popconfirm, Popover, Typography } from "antd";

import { useDeleteColumnMutation } from "store/api/columns/columns-api";

import { useGetQueryMessages } from "hooks/general/use-get-query-messages";

import { IColumn } from "types/IColumn";

import { EditColumnModal } from "./EditColumnModal/EditColumnModal";
import styles from "./ProjectColumn.module.scss";

interface IProjectColumnProps {
  columnData?: IColumn;
}

export const ProjectColumn = (props: IProjectColumnProps) => {
  const { columnData } = props;

  console.log(columnData)

  const [isEditColumnModalOpen, setIsEditColumnModalOpen] =
    React.useState(false);

  const [
    deleteColumn,
    {
      isSuccess: isDeleteColumnSuccess,
      isLoading: isDeleteColumnLoading,
      status: deleteColumnStatus,
      error: deleteColumnError,
    },
  ] = useDeleteColumnMutation();

  const handleDeleteColumn = () => {
    deleteColumn({ id: columnData?.id });
  };

  const handleOpenEditColumnModal = () => {
    setIsEditColumnModalOpen(true);
  };

  const handleCloseEditColumnModal = () => {
    setIsEditColumnModalOpen(false);
  };

  useGetQueryMessages({
    isSuccess: isDeleteColumnSuccess,
    isLoading: isDeleteColumnLoading,
    status: deleteColumnStatus,
    error: deleteColumnError,
    successMessage: "Column deleted successfully",
  });

  const popoverContent = (
    <>
      <div
        className={styles.projectColumnAdditionalActionsWrapper}
        onClick={handleOpenEditColumnModal}
      >
        <EditOutlined className={styles.projectColumnAdditionalActionsIcon} />
        <Typography.Text className={styles.projectColumnAdditionalActionsText}>
          Edit Column
        </Typography.Text>
      </div>

      <Popconfirm
        title="Are you sure you want to delete this column and tasks in it?"
        onConfirm={handleDeleteColumn}
      >
        <div className={styles.projectColumnAdditionalActionsWrapper}>
          <DeleteOutlined
            className={styles.projectColumnAdditionalActionsIcon}
          />
          <Typography.Text
            className={styles.projectColumnAdditionalActionsText}
          >
            Delete Column
          </Typography.Text>
        </div>
      </Popconfirm>
    </>
  );

  return (
    <>
      <div className={styles.projectColumnWrapper}>
        <div className={styles.projectColumnHeaderWrapper}>
          <Typography.Text className={styles.projectColumnTitle}>
            {columnData?.title}
          </Typography.Text>

          <Popover content={popoverContent} placement="leftTop">
            <EllipsisOutlined className={styles.projectColumnHeaderIcon} />
          </Popover>
        </div>

        <div>add cart</div>
      </div>

      <EditColumnModal
        isEditColumnModalOpen={isEditColumnModalOpen}
        handleCloseEditColumnModal={handleCloseEditColumnModal}
        columnData={columnData}
      />
    </>
  );
};
