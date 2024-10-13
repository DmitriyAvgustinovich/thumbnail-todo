import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Spin, Typography } from "antd";

import { AddTaskForm } from "features/addTaskForm";
import { EditColumnForm } from "features/editColumnForm";

import { IColumn } from "shared/types/IColumn";

import styles from "./ProjectColumn.module.scss";
import { ColumnTaskDetails } from "../../../ColumnTask/ui/ColumnTaskDetails/ColumnTaskDetails";
import { useGetTasksByColumnIdQuery } from "../../api/project-column-api";
import { ProjectBoardActions } from "../ProjectBoardActions/ProjectBoardActions";

interface IProjectColumnProps {
  columnData?: IColumn;
}

export const ProjectColumn = (props: IProjectColumnProps) => {
  const { columnData } = props;

  const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = React.useState(false);

  const handleOpenEditForm = () => {
    setIsEditFormVisible(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormVisible(false);
  };

  const handleOpenAddTaskForm = () => {
    setIsAddFormVisible(true);
  };

  const handleCloseAddTaskForm = () => {
    setIsAddFormVisible(false);
  };

  const { data: columnTasksData, isLoading: isColumnTasksDataLoading } =
    useGetTasksByColumnIdQuery({
      columnId: columnData?.id ?? "",
    });

  return (
    <div className={styles.projectColumnWrapper}>
      <div className={styles.projectColumnHeaderWrapper}>
        {!isEditFormVisible ? (
          <Typography.Text className={styles.projectColumnTitle}>
            {columnData?.title}
          </Typography.Text>
        ) : (
          <EditColumnForm
            columnData={columnData}
            handleCloseEditForm={handleCloseEditForm}
          />
        )}

        <ProjectBoardActions
          columnData={columnData}
          handleOpenEditModal={handleOpenEditForm}
        />
      </div>

      {isColumnTasksDataLoading ? (
        <Spin className={styles.projectColumnSpinner} />
      ) : (
        columnTasksData?.map((task) => (
          <ColumnTaskDetails key={task.id} taskData={task} />
        ))
      )}

      {!isAddFormVisible ? (
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
          handleCloseAddTaskForm={handleCloseAddTaskForm}
        />
      )}
    </div>
  );
};
