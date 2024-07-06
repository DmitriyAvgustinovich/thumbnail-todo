import React from "react";

import { useParams } from "react-router-dom";

import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { PageLayout } from "components/PageLayout/PageLayout";

import { useGetColumnsByProjectIdQuery } from "store/api/columns/columns-api";
import { useGetProjectByIdQuery } from "store/api/projects/projects-api";

import { useContexts } from "hooks/general/use-contexts";

import { IColumn } from "types/IColumn";

import { EditMainInfoModal } from "./EditMainInfoModal/EditMainInfoModal";
import styles from "./ProjectBoard.module.scss";
import { ProjectBoardSkeleton } from "./ProjectBoardSkeleton/ProjectBoardSkeleton";
import { AddColumnForm } from "./ProjectColumn/AddColumnForm/AddColumnForm";
import { ProjectColumn } from "./ProjectColumn/ProjectColumn";

export const ProjectBoard = () => {
  const [openEditMainInfoModal, setOpenEditMainInfoModal] =
    React.useState(false);

  const {
    addColumnFormContext: { isAddColumnFormVisible, handleOpenAddColumnForm },
  } = useContexts();

  const { id } = useParams();
  const { data: projectData, isLoading: isProjectDataLoading } =
    useGetProjectByIdQuery({ id });

  const { data: columnsData, isFetching: isColumnsDataFetching } =
    useGetColumnsByProjectIdQuery({ projectId: id });

  const handleOpenEditMainInfoModal = () => {
    setOpenEditMainInfoModal(true);
  };

  const handleCloseEditMainInfoModal = () => {
    setOpenEditMainInfoModal(false);
  };

  const backgroundImageStyles = {
    backgroundImage: `url(${projectData?.cover})`,
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

            <div className={styles.projectBoardHeaderButtonsWrapper}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="large"
                onClick={handleOpenEditMainInfoModal}
              >
                Edit main info
              </Button>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={handleOpenAddColumnForm}
                disabled={isColumnsDataFetching || isAddColumnFormVisible}
                loading={isColumnsDataFetching}
              >
                Add column
              </Button>
            </div>
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
