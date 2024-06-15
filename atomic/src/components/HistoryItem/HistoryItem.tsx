import React from "react";
import styles from "./styles.module.css";
// eslint-disable-next-line no-unused-vars
React;

type Props = {
  item: HistoryItem;
};

const HistoryItem = ({ item }: Props) => {
  return (
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
        <button>Открыть</button>
      </div>
    </div>
  );
};

export { HistoryItem };
