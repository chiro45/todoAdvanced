import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./ModalBase.module.css";

type IModalBase = {
  children: ReactNode;
};

export const ModalBase: FC<IModalBase> = ({ children }) => {
  return createPortal(
    <div className={styles.modalContainer}>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: ".4rem",
          padding: "1rem",
        }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};
