import styles from "./TextArea.module.css";

export const TexArea = ({ name, placeholder, value, handleChange }: any) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={styles.textarea}
    />
  );
};
