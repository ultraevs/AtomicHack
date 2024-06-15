import React from "react";
import styles from "./styles.module.css";
// eslint-disable-next-line no-unused-vars
React;

type Props = {
  item: any;
  onClose: any;
};

const ModalContent = ({ item, onClose }: Props) => {
  return (
    <div className={styles.content}>
      <div className={styles.content__img}>
        <img src={`data:image/jpeg;base64,${item.photo}`} alt="img" />
      </div>
      <div className={styles.content__info}>
        <p>Дата: <span>{item.date}</span></p>
        {item?.name && <p>Пользователь: <span>{item?.name}</span></p>}
        <p>Комментарий: <span>{item.comment.String}</span></p>
        <p>Результат: <span>{item.result}</span></p>
        <p>Статус: <span>{item.status}</span></p>
      </div>
      <div className={styles.content__button}>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export { ModalContent };
