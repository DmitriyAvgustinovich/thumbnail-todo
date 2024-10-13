import { Modal } from "antd";

import { INotification } from "shared/types/INotification";

import styles from "./NotificationItemModal.module.scss";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import { NotificationItemTitle } from "../NotificationItemTitle/NotificationItemTitle";

interface INotificationItemModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  projectId: string;
  notificationsData: INotification[];
}

export const NotificationItemModal = (
  props: INotificationItemModalProps
) => {
  const {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    projectId,
    notificationsData,
  } = props;

  return (
    <Modal
      title={
        <NotificationItemTitle
          projectId={projectId}
          isModalOpen={isModalOpen}
          handleOpenModal={handleOpenModal}
        />
      }
      open={isModalOpen}
      onCancel={handleCloseModal}
      footer={null}
    >
      <div className={styles.notificationItemModalWrapper}>
        {notificationsData.map((notification) => (
          <NotificationItem
            key={notification.id}
            notificationData={notification}
          />
        ))}
      </div>
    </Modal>
  );
};
