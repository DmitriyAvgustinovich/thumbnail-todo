import { Typography } from "antd";

import { IProject } from "shared/types/IProject";

import styles from "./ProjectItem.module.scss";

interface IProjectItemProps {
  projectData: IProject;
}

export const ProjectItem = (props: IProjectItemProps) => {
  const { projectData } = props;

  return (
    <div className={styles.projectItemWrapper}>
      <img
        className={styles.projectItemImage}
        src={projectData.cover}
        alt=""
      />

      <Typography.Text className={styles.projectItemTitle}>
        {projectData.title}
      </Typography.Text>

      <Typography.Text className={styles.projectItemDescription}>
        {projectData.description}
      </Typography.Text>
    </div>
  );
};
