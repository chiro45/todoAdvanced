import { CSSProperties, FC, ReactNode } from "react";
import styles from "./Button.module.css";

type ITypeButton = "info" | "error" | "warning" | "disabled" | "success";

type Ibutton = {
  stylesCustom?: CSSProperties;
  type: ITypeButton;
  disabled?: boolean;
  children: ReactNode;
  onClick: VoidFunction;
};

export const Button: FC<Ibutton> = ({
  children,
  type,
  stylesCustom,
  disabled,
  onClick,
}) => {
  return (
    <div
      onClick={() => {
        if (!disabled) onClick();
      }}
      className={`${styles.button} 
        ${styles[type]} 
        ${disabled ? styles.disabled : ""} 
    `}
      style={stylesCustom}
    >
      {children}
    </div>
  );
};
