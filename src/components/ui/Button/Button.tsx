import { CSSProperties, FC, MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";

type ITypeButton = "info" | "error" | "warning" | "disabled" | "success";

type IButton = {
  stylesCustom?: CSSProperties;
  type: ITypeButton;
  disabled?: boolean;
  children: ReactNode;
  handleonClick: () => void;
};

export const Button: FC<IButton> = ({
  children,
  type,
  stylesCustom,
  disabled,
  handleonClick: onClick,
}) => {
  return (
    <div
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!disabled) onClick();
      }}
      className={`${styles.button}  
        ${styles[type]} 
        ${disabled ? styles.disabled : ""}`}
      style={stylesCustom}
    >
      {children}
    </div>
  );
};
