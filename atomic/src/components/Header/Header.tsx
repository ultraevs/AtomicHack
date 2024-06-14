import React from "react";
import styles from "./styles.module.css";
import AtomicLogo from "../../assets/svg/AtomicLogo.svg";
import { NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
React;

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__title}>
        <img src={AtomicLogo} alt="atomic logo" />
        <p>Shmyaks AI</p>
      </div>
      <nav className={styles.header__navbar}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to={"/"}
        >
          Модель
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to={"/history"}
        >
          История
        </NavLink>
      </nav>
    </header>
  );
};

export { Header };
