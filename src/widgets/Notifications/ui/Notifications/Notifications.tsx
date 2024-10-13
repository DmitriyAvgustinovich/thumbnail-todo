import React from "react";

import { NotificationOutlined } from "@ant-design/icons";
import { Button, Popover, Tooltip } from "antd";

import { useGetNotificationsByProjectIdQuery } from "../../api/notifications-api";
import { NotificationItemContent } from "../NotificationItemContent/NotificationItemContent";
import { NotificationItemModal } from "../NotificationItemModal/NotificationItemModal";
import { NotificationItemTitle } from "../NotificationItemTitle/NotificationItemTitle";

export const Notifications = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handlePopoverOpen = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handlePopoverClose();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const projectId =
    window.location.pathname.match(/\/projects\/(\d+)/)?.[1] ?? "";

  const { data: notificationsData } = useGetNotificationsByProjectIdQuery({
    projectId,
  });

  return (
    <>
      <Popover
        title={
          <NotificationItemTitle
            projectId={projectId}
            isModalOpen={isModalOpen}
            handleOpenModal={handleOpenModal}
          />
        }
        content={
          <NotificationItemContent
            projectId={projectId}
            notificationsData={notificationsData ?? []}
          />
        }
        open={isPopoverOpen}
      >
        <Tooltip title="Notifications">
          <Button
            type="primary"
            icon={<NotificationOutlined />}
            onClick={handlePopoverOpen}
          />
        </Tooltip>
      </Popover>

      <NotificationItemModal
        isModalOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        projectId={projectId}
        notificationsData={notificationsData ?? []}
      />
    </>
  );
};
