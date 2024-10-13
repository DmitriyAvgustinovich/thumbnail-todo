import { useNavigate } from "react-router-dom";

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Popover } from "antd";

import { RouterPath } from "shared/config/route-config";
import { useDeleteEntityQuery } from "shared/lib/hooks/use-delete-entity-query";
import { IProject } from "shared/types/IProject";

import styles from "./ProjectBoardActions.module.scss";
import { useDeleteProjectMutation } from "../../api/project-board-api";

interface IProjectBoardActionsProps {
  projectData?: IProject;
  handleOpenAddModal: () => void;
  handleOpenEditModal: () => void;
}

export const ProjectBoardActions = (props: IProjectBoardActionsProps) => {
  const { projectData, handleOpenAddModal, handleOpenEditModal } = props;

  const navigate = useNavigate();

  const handleNavigateToProjectsPage = () => {
    navigate(RouterPath.projects);
  };

  const { handleDeleteEntityFinish } = useDeleteEntityQuery({
    useDeleteQueryMutation: useDeleteProjectMutation,
    entityDataIdField: "id",
    entityDataId: projectData?.id ?? "",
    deleteSuccessAction: handleNavigateToProjectsPage,
    successMutationMessage: "Project deleted successfully",
  });

  const PopoverContent = (
    <div className={styles.projectBoardActionsWrapper}>
      <Button
        className={styles.projectBoardActionsButton}
        icon={<PlusOutlined />}
        onClick={handleOpenAddModal}
      >
        Add column
      </Button>

      <Button
        className={styles.projectBoardActionsButton}
        icon={<EditOutlined />}
        onClick={handleOpenEditModal}
      >
        Edit project
      </Button>

      <Popconfirm
        title="Are you sure you want to delete this project with all tasks and columns?"
        onConfirm={handleDeleteEntityFinish}
      >
        <Button
          className={styles.projectBoardActionsButton}
          icon={<DeleteOutlined />}
        >
          Delete project
        </Button>
      </Popconfirm>
    </div>
  );

  return (
    <Popover content={PopoverContent} placement="leftTop">
      <Button type="primary" icon={<EllipsisOutlined />} />
    </Popover>
  );
};
