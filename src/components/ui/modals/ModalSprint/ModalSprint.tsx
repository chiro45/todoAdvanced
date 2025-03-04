import React, { useState, useEffect } from "react";
import { ISprint } from "../../../../types/ITodos";
import styles from "./ModalSprint.module.css";
import { ModalBase } from "../ModalBase/ModalBase";
import { InputField } from "../../Input/Input";
import { Button } from "../../Button/Button";
interface SprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sprint: ISprint) => void;
  onDelete: (id: string) => void;
  initialData?: ISprint | null;
}

export const ModalSprint: React.FC<SprintModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
}) => {
  const [sprint, setSprint] = useState<ISprint>({
    id: "",
    fechaInicio: "",
    fechaCierre: "",
    nombre: "",
    tareas: [],
  });

  useEffect(() => {
    if (initialData) {
      setSprint(initialData);
    } else {
      setSprint({
        id: "",
        fechaInicio: "",
        fechaCierre: "",
        nombre: "",
        tareas: [],
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSprint({ ...sprint, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!sprint.fechaInicio || !sprint.fechaCierre) return;
    onSave(sprint); // onSave maneja tanto crear como actualizar
    onClose();
  };

  const handleDelete = () => {
    if (sprint.id) {
      onDelete(sprint.id); // Eliminar sprint si existe un id
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBase>
      <div className={styles.modal}>
        <h2>{initialData ? "Editar Sprint" : "Crear Sprint"}</h2>
        <InputField
          type={"text"}
          name={"nombre"}
          placeholder={"Inserte un nombre"}
          value={sprint.nombre}
          handleChange={handleChange}
          className={styles.input}
        />
        <InputField
          type={"date"}
          name={"fechaInicio"}
          value={sprint.fechaInicio}
          handleChange={handleChange}
          className={styles.input}
        />
        <InputField
          type={"date"}
          name={"fechaCierre"}
          value={sprint.fechaCierre}
          handleChange={handleChange}
          className={styles.input}
        />

        <div className={styles.actions}>
          <Button type="error" handleonClick={onClose}>
            Cancelar
          </Button>

          <Button type="info" handleonClick={handleSubmit}>
            Actualizar
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};
