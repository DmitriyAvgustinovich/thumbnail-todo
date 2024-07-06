import React from "react";

import { Link } from "react-router-dom";

import { Button, Pagination, Spin, Typography } from "antd";

import { PageLayout } from "components/PageLayout/PageLayout";

import { useGetProjectsByAdminUserIdQuery } from "store/api/projects/projects-api";

import { RouterPath } from "configs/route-config";

import { PROJECTS_PAGE_SIZE } from "constants/general";

import { useGetPaginatedData } from "hooks/general/use-get-paginated-data";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { IProject } from "types/IProject";

import { AddProjectModal } from "./AddProjectModal/AddProjectModal";
import { ProjectItemCard } from "./ProjectItemCard/ProjectItemCard";
import styles from "./Projects.module.scss";

export const Projects = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] =
    React.useState(false);

  const { authUser } = useGetAuthUser();

  const { data: myProjectsData, isLoading: isMyProjectsLoading } =
    useGetProjectsByAdminUserIdQuery({
      adminUserId: authUser?.id ?? "",
    });

  const { paginatedTableData } = useGetPaginatedData<IProject>({
    data: myProjectsData,
    currentPage,
    pageSize: PROJECTS_PAGE_SIZE,
  });

  const isMyProjectsDataEmpty = myProjectsData?.length === 0;

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenAddNewProjectModal = () => {
    setIsAddProjectModalOpen(true);
  };

  const handleCloseAddProjectModal = () => {
    setIsAddProjectModalOpen(false);
  };

  return (
    <PageLayout>
      <div className={styles.projectsTitleWrapper}>
        <h1 className={styles.projectsTitle}>Projects</h1>

        <Button
          type="primary"
          size="large"
          onClick={handleOpenAddNewProjectModal}
        >
          Add project
        </Button>
      </div>

      {isMyProjectsDataEmpty && !isMyProjectsLoading && (
        <Typography.Text className={styles.noProjectsYetText}>
          No projects yet.
        </Typography.Text>
      )}

      <div className={styles.projectsListWrapper}>
        {isMyProjectsLoading ? (
          <Spin size="large" />
        ) : (
          paginatedTableData?.map((project) => (
            <Link to={`${RouterPath.projects}/${project.id}`}>
              <ProjectItemCard key={project.id} projectData={project} />
            </Link>
          ))
        )}
      </div>

      {!isMyProjectsLoading && !isMyProjectsDataEmpty && (
        <Pagination
          className={styles.projectsPaginationWrapper}
          current={currentPage}
          total={myProjectsData?.length ?? 0}
          pageSize={PROJECTS_PAGE_SIZE}
          onChange={handleChangePage}
        />
      )}

      <AddProjectModal
        isAddProjectModalOpen={isAddProjectModalOpen}
        handleCloseAddProjectModal={handleCloseAddProjectModal}
      />
    </PageLayout>
  );
};
