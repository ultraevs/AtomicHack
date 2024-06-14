import React from "react";
import styles from "./styles.module.css";
import AtomicLogo from "../../assets/svg/AtomicLogo.svg";
// eslint-disable-next-line no-unused-vars
React;

const AuthHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__title}>
        <img src={AtomicLogo} alt="atomic logo" />
        <p>Shmyaks AI</p>
      </div>
    </header>
  );
};

export { AuthHeader };
