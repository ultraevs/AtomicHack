import React from "react";
import styles from "./styles.module.css";
import cn from "classnames";

type Props = {
  isModalOpen: boolean;
  children: React.ReactNode;
};

const Modal = ({ isModalOpen, children }: Props) => {
  return (
    <section className={cn(styles.modal, { "is-hidden": !isModalOpen })}>
      <div className={styles.modal__content}>
        {children}
      </div>
    </section>
  );
};

export { Modal };
