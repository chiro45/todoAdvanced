import styles from "./InputStyles.module.css";

export const InputField = ({
  type,
  name,
  placeholder,
  value,
  handleChange,
}: any) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={styles.input}
    />
  );
};
