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

import { useContexts } from "hooks/general/use-contexts";
import { useDeleteEntityQuery } from "hooks/general/use-delete-entity-query";

import { IColumn } from "types/IColumn";
import { IProject } from "types/IProject";

import { EditMainInfoModal } from "./EditMainInfoModal/EditMainInfoModal";
import styles from "./ProjectBoard.module.scss";
import { ProjectBoardSkeleton } from "./ProjectBoardSkeleton/ProjectBoardSkeleton";
import { AddColumnForm } from "./ProjectColumn/AddColumnForm/AddColumnForm";
import { ProjectColumn } from "./ProjectColumn/ProjectColumn";

export const ProjectBoard = () => {
  const [openEditMainInfoModal, setOpenEditMainInfoModal] =
    React.useState(false);

  const handleOpenEditMainInfoModal = () => {
    setOpenEditMainInfoModal(true);
  };

  const handleCloseEditMainInfoModal = () => {
    setOpenEditMainInfoModal(false);
  };

  const {
    entityFormContext: { isAddColumnFormVisible, handleOpenAddColumnForm },
  } = useContexts();

  const navigate = useNavigate();

  const { id } = useParams();
  const { data: projectData, isLoading: isProjectDataLoading } =
    useGetProjectByIdQuery({ id });

  const { data: columnsData } = useGetColumnsByProjectIdQuery({
    projectId: id ?? "",
  });

  const backgroundImageStyles = {
    backgroundImage: `url(${projectData?.cover})`,
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
              confirmDeleteTitle="Are you sure you want to delete this project with all tasks?"
              handleDeleteAction={handleDeleteEntityFinish}
              handleOpenAddModal={handleOpenAddColumnForm}
              handleOpenEditModal={handleOpenEditMainInfoModal}
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
                <ProjectColumn columnData={column} />
              ))}

              {isAddColumnFormVisible && <AddColumnForm projectId={id} />}
            </div>
          </div>

          <EditMainInfoModal
            openEditMainInfoModal={openEditMainInfoModal}
            handleCloseEditMainInfoModal={handleCloseEditMainInfoModal}
            projectData={projectData}
          />
        </>
      )}
    </PageLayout>
  );
};
