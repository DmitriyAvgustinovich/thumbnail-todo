import React from "react";

import { Link } from "react-router-dom";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Pagination, Spin, Tooltip, Typography } from "antd";

import { AddProjectModal } from "features/addProjectModal";

import { RouterPath } from "shared/config/route-config";
import { PROJECTS_PAGE_SIZE } from "shared/consts/general";
import { useGetAuthUser } from "shared/lib/hooks/use-get-auth-user";
import { useGetPaginatedData } from "shared/lib/hooks/use-get-paginated-data";
import { IProject } from "shared/types/IProject";
import { PageLayout } from "shared/ui/PageLayout/PageLayout";

import styles from "./Projects.module.scss";
import { useGetProjectsByAdminUserIdQuery } from "../../api/projects-api";
import { ProjectItem } from "../ProjectItem/ProjectItem";

export const Projects = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PageLayout>
      <div className={styles.projectsTitleWrapper}>
        <h1 className={styles.projectsTitle}>Projects</h1>

        <Tooltip title="Add new project">
          <Button
            type="primary"
            onClick={handleOpenAddNewProjectModal}
            icon={<PlusOutlined />}
            loading={isMyProjectsLoading}
          />
        </Tooltip>
      </div>

      {isMyProjectsDataEmpty && !isMyProjectsLoading && (
        <Typography.Text className={styles.projectsEmptyText}>
          No projects yet.
        </Typography.Text>
      )}

      <div className={styles.projectsListWrapper}>
        {isMyProjectsLoading ? (
          <Spin size="large" />
        ) : (
          paginatedTableData?.map((project) => (
            <Link to={`${RouterPath.projects}/${project.id}`} key={project.id}>
              <ProjectItem key={project.id} projectData={project} />
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
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </PageLayout>
  );
};
