import React from "react";

import { useParams } from "react-router-dom";

import { AddColumnForm } from "features/addColumnForm/ui/AddColumnForm/AddColumnForm";
import { EditProjectModal } from "features/editProjectModal/ui/EditProjectModal/EditProjectModal";

import { useGetProjectByIdQuery } from "shared/lib/hooks/use-get-project-by-id-query";
import { IColumn } from "shared/types/IColumn";
import { PageLayout } from "shared/ui/PageLayout/PageLayout";

import styles from "./ProjectBoard.module.scss";
import { useGetColumnsByProjectIdQuery } from "../../../ProjectColumn/api/project-column-api";
import { ProjectColumn } from "../../../ProjectColumn/ui/ProjectColumn/ProjectColumn";
import { ProjectBoardActions } from "../ProjectBoardActions/ProjectBoardActions";
import { ProjectBoardSkeleton } from "../ProjectBoardSkeleton/ProjectBoardSkeleton";

export const ProjectBoard = () => {
  const [isAddFormVisible, setIsAddFormVisible] = React.useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);

  const handleOpenAddForm = () => {
    setIsAddFormVisible(true);
  };

  const handleCloseAddForm = () => {
    setIsAddFormVisible(false);
  };

  const handleOpenEditModal = () => {
    setIsOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  const { id } = useParams();
  const { data: projectData, isLoading: isProjectDataLoading } =
    useGetProjectByIdQuery({ id });

  const { data: columnsData } = useGetColumnsByProjectIdQuery({
    projectId: id ?? "",
  });

  const backgroundImageStyles = {
    background: projectData?.cover
      ? `url(${projectData?.cover}) center center / cover no-repeat`
      : "var(--project-board-default-bg-color)",
  };

  return (
    <PageLayout>
      {isProjectDataLoading ? (
        <ProjectBoardSkeleton />
      ) : (
        <>
          <div className={styles.projectBoardHeaderWrapper}>
            <h1 className={styles.projectBoardTitle}>
              Project{" "}
              <span className={styles.projectBoardTitleColorPiece}>
                {projectData?.title}
              </span>{" "}
              Board
            </h1>

            <ProjectBoardActions
              projectData={projectData}
              handleOpenAddModal={handleOpenAddForm}
              handleOpenEditModal={handleOpenEditModal}
            />
          </div>

          <div
            className={styles.projectBoardCover}
            style={backgroundImageStyles}
          >
            <div className={styles.projectBoardColumnsWrapper}>
              {columnsData?.map((column: IColumn) => (
                <ProjectColumn key={column.id} columnData={column} />
              ))}

              {isAddFormVisible && (
                <AddColumnForm
                  projectData={projectData}
                  handleCloseAddForm={handleCloseAddForm}
                />
              )}
            </div>
          </div>

          <EditProjectModal
            isOpenEditModal={isOpenEditModal}
            handleCloseEditModal={handleCloseEditModal}
            projectData={projectData}
          />
        </>
      )}
    </PageLayout>
  );
};
