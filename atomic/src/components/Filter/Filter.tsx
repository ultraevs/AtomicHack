import React, { useState } from "react";
import styles from "./styles.module.css";
import cn from "classnames";
import searchLoop from "../../assets/svg/search.svg";
import arrow from "../../assets/svg/arrow.svg";
// eslint-disable-next-line no-unused-vars
React;

type Props = {
  title: string;
  inputValue: string;
  inputName: string;
  onChangeValue: any;
  submit: any;
};

const Filter = ({
  title,
  inputValue,
  inputName,
  onChangeValue,
  submit,
}: Props) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  return (
    <div className={styles.filter}>
      <div
        className={
          isFormOpen
            ? cn(styles.filter__block, styles.selected)
            : styles.filter__block
        }
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <p>
          {title}
          <span>
            <img src={arrow} alt="arrow" />
          </span>
        </p>
      </div>
      <div
        className={
          isFormOpen
            ? cn(styles.filter__dynamic, styles.open)
            : styles.filter__dynamic
        }
      >
        <div>
          <img src={searchLoop} alt="search loop" onClick={submit} />
          <input
            type="text"
            placeholder="Найти..."
            name={inputName}
            value={inputValue}
            onChange={onChangeValue}
          />
        </div>
      </div>
    </div>
  );
};

export { Filter };
