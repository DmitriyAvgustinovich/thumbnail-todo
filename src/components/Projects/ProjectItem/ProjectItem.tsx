import { IProject } from 'types/IProject'

import styles from './ProjectItem.module.scss'

interface IProjectItemProps {
  projectData: IProject
}

export const ProjectItem = (props: IProjectItemProps) => {
  const { projectData } = props

  return (
    <div className={styles.postItemWrapper}>ProjectItem</div>
  )
}
