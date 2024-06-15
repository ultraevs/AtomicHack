import React, { useState } from "react";
import styles from "./styles.module.css";
import { Modal } from "../Modal";
import { ModalContent } from "../ModalContent";
// eslint-disable-next-line no-unused-vars
React;

type Props = {
  item: HistoryItem;
};

const HistoryItem = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <>
      <div className={styles.historyItem}>
        <div className={styles.historyItem__img}>
          <img src={`data:image/jpeg;base64,${item.photo}`} alt="img" />
        </div>
        <div className={styles.historyItem__info}>
          <p>{item.date}</p>
          <p>
            Результат: <span>{item.result}</span>
          </p>
          <p>
            Статус: <span>{item.status}</span>
          </p>
        </div>
        <div className={styles.historyItem__button}>
          <button onClick={openModal}>Открыть</button>
        </div>
      </div>
      <Modal isModalOpen={isOpen}>
        <ModalContent item={item} onClose={closeModal} />
      </Modal>
    </>
  );
};

export { HistoryItem };
