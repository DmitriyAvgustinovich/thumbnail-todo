import { Typography } from "antd";

import { IProject } from "types/IProject";

import styles from "./ProjectItemCard.module.scss";

interface IProjectItemCardProps {
  projectData: IProject;
}

export const ProjectItemCard = (props: IProjectItemCardProps) => {
  const { projectData } = props;

  return (
    <div className={styles.projectItemCardWrapper}>
      <img
        className={styles.projectItemCardImage}
        src={projectData.cover}
        alt=""
      />

      <Typography.Text className={styles.projectItemCardTitle}>
        {projectData.title}
      </Typography.Text>

      <Typography.Text className={styles.projectItemCardDescription}>
        {projectData.description}
      </Typography.Text>
    </div>
  );
};
