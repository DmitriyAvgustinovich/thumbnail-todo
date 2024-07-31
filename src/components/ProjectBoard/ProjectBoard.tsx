import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import { AdditionalActionsPopoverContent } from "components/AdditionalActionsPopoverContent/AdditionalActionsPopoverContent";
import { PageLayout } from "components/PageLayout/PageLayout";

import { useGetColumnsByProjectIdQuery } from "store/api/columns/columns-api";
import {
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
} from "store/api/projects/projects-api";

import { RouterPath } from "configs/route-config";

import { useDeleteEntityQuery } from "hooks/general/use-delete-entity-query";

import { IColumn } from "types/IColumn";
import { IProject } from "types/IProject";

import { EditProjectModal } from "./EditProjectModal/EditProjectModal";
import styles from "./ProjectBoard.module.scss";
import { ProjectBoardSkeleton } from "./ProjectBoardSkeleton/ProjectBoardSkeleton";
import { AddColumnForm } from "./ProjectColumn/AddColumnForm/AddColumnForm";
import { ProjectColumn } from "./ProjectColumn/ProjectColumn";

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

  const navigate = useNavigate();

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

  const handleNavigateToProjectsPage = () => {
    navigate(RouterPath.projects);
  };

  const { handleDeleteEntityFinish } = useDeleteEntityQuery<IProject>({
    useDeleteQueryMutation: useDeleteProjectMutation,
    entityData: projectData,
    deleteSuccessAction: handleNavigateToProjectsPage,
    successMutationMessage: "Project deleted successfully",
  });

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

            <AdditionalActionsPopoverContent
              confirmDeleteTitle="Are you sure you want to delete this project with all tasks and columns?"
              handleDeleteAction={handleDeleteEntityFinish}
              handleOpenAddModal={handleOpenAddForm}
              handleOpenEditModal={handleOpenEditModal}
              addButtonText="column"
              placement="leftTop"
              withButtonWrapper
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
