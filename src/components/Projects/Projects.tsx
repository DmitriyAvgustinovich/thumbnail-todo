import React from "react";

import { Button } from "antd";

import { PageLayout } from "components/PageLayout/PageLayout";
import { Spinner } from "components/Spinner/Spinner";

import { useGetProjectsByAdminUserIdQuery } from "store/api/projects/projects-api";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { AddProjectModal } from "./AddProjectModal/AddProjectModal";
import { ProjectItem } from "./ProjectItem/ProjectItem";
import styles from "./Projects.module.scss";

export const Projects = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] =
    React.useState(false);

  const { authUser } = useGetAuthUser();

  const { data: myProjectsData, isLoading: isMyProjectsLoading } =
    useGetProjectsByAdminUserIdQuery({
      adminUserId: authUser?.id ?? "",
    });

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

      <div className={styles.projectsListWrapper}>
        {isMyProjectsLoading ? (
          <Spinner />
        ) : (
          myProjectsData?.map((project) => (
            <ProjectItem key={project.id} projectData={project} />
          ))
        )}
      </div>

      <AddProjectModal
        isAddProjectModalOpen={isAddProjectModalOpen}
        handleCloseAddProjectModal={handleCloseAddProjectModal}
      />
    </PageLayout>
  );
};
