import { Button } from "../../Button/Button";
import { ModalBase } from "../ModalBase/ModalBase";
import styles from "./ModalInfo.module.css";

interface DisplayFields<T> {
  label: string;
  key: keyof T;
  render?: (value: T) => React.ReactNode;
}

interface IModalInfo<T> {
  data: T;
  title: string;
  fields: DisplayFields<T>[];
  handleCloseModal: () => void;
}

export const ModalInfo = <T,>({
  title,
  fields,
  handleCloseModal,
  data,
}: IModalInfo<T>) => {
  return (
    <ModalBase>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h1>{title}</h1>
        </div>

        <div className={styles.modalBody}>
          {fields.map((field, index) => (
            <div className={styles.fieldContainer} key={index}>
              <strong>{field.label}: </strong>
              {field.render ? field.render(data) : `${data[field.key]}`}
            </div>
          ))}
        </div>

        <div className={styles.modalFooter}>
          <Button type="info" handleonClick={handleCloseModal}>
            Cerrar
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};
