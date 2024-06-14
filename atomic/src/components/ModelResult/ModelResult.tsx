import React from "react";
import styles from "./styles.module.css";
import cn from "classnames";
// eslint-disable-next-line no-unused-vars
React;

type Props = {
  items: any;
  fileIndex: number;
  setFileIndex: any;
};

const ModelResult = ({ items, fileIndex, setFileIndex }: Props) => {
  return (
    <div className={styles.modelResult}>
      <div className={styles.modelResult__block}>
        <img
          src={`data:image/jpeg;base64,${items[fileIndex]}`}
          alt={`${fileIndex} ml image`}
        />
      </div>
      <div className={styles.modelResult__tumblers}>
        {items.map((item: any, index: number) => (
          <div
            key={index} 
            className={
              fileIndex === index
                ? cn(styles.modelResult__tumbler, styles.active)
                : styles.modelResult__tumbler
            }
            onClick={() => setFileIndex(index)}
          >
            <span></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ModelResult };
