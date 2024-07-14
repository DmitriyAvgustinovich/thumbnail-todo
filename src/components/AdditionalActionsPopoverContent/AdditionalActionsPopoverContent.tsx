import { TooltipPlacement } from "antd/es/tooltip";

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Popover } from "antd";

import styles from "./AdditionalActionsPopoverContent.module.scss";

interface IAdditionalActionsPopoverContentProps {
  confirmDeleteTitle: string;
  handleDeleteAction: () => void;
  handleOpenAddModal?: () => void;
  handleOpenEditModal: () => void;
  addButtonText?: string;
  placement: TooltipPlacement;
  withButtonWrapper?: boolean;
  isExistHiddenButton?: boolean;
}

export const AdditionalActionsPopoverContent = (
  props: IAdditionalActionsPopoverContentProps
) => {
  const {
    confirmDeleteTitle,
    handleDeleteAction,
    handleOpenAddModal,
    handleOpenEditModal,
    addButtonText,
    placement,
    withButtonWrapper = false,
    isExistHiddenButton,
  } = props;

  const popoverContentArray = [
    {
      buttonIcon: <PlusOutlined />,
      buttonText: `Add ${addButtonText}`,
      action: handleOpenAddModal,
      isExistHiddenButton,
    },
    {
      buttonIcon: <EditOutlined />,
      buttonText: "Edit",
      action: handleOpenEditModal,
      isExistHiddenButton: false,
    },
    {
      buttonIcon: <DeleteOutlined />,
      buttonText: "Delete",
      requiredConfirm: true,
      confirmDeleteTitle,
      action: handleDeleteAction,
      isExistHiddenButton: false,
    },
  ];

  const notHiddenButtons = popoverContentArray.filter(
    (popoverContentItem) => !popoverContentItem.isExistHiddenButton
  );

  const popoverContent = notHiddenButtons.map((popoverContentItem) => (
    <div className={styles.additionalActionsPopoverContentWrapper}>
      {popoverContentItem.requiredConfirm ? (
        <Popconfirm
          title={popoverContentItem.confirmDeleteTitle}
          onConfirm={popoverContentItem.action}
        >
          <Button
            className={styles.additionalActionsPopoverContentButton}
            icon={popoverContentItem.buttonIcon}
          >
            {popoverContentItem.buttonText}
          </Button>
        </Popconfirm>
      ) : (
        <Button
          className={styles.additionalActionsPopoverContentButton}
          icon={popoverContentItem.buttonIcon}
          onClick={popoverContentItem.action}
        >
          {popoverContentItem.buttonText}
        </Button>
      )}
    </div>
  ));

  return (
    <Popover content={popoverContent} placement={placement}>
      {withButtonWrapper ? (
        <Button type="primary" icon={<EllipsisOutlined />} />
      ) : (
        <EllipsisOutlined
          className={styles.additionalActionsPopoverContentIcon}
        />
      )}
    </Popover>
  );
};
