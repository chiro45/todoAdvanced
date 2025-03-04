import React, { useState, useEffect } from "react";
import { ISprint } from "../../../../types/ITodos";
import styles from "./ModalSprint.module.css";
import { ModalBase } from "../ModalBase/ModalBase";
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
        <input
          type="text"
          name="nombre"
          placeholder="Inserte un nombre"
          value={sprint.nombre}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="date"
          name="fechaInicio"
          value={sprint.fechaInicio}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="date"
          name="fechaCierre"
          value={sprint.fechaCierre}
          onChange={handleChange}
          className={styles.input}
        />

        <div className={styles.actions}>
          <button onClick={onClose} className={styles.button}>
            Cancelar
          </button>
          {initialData ? (
            <>
              <button onClick={handleDelete} className={styles.button}>
                Eliminar
              </button>
              <button onClick={handleSubmit} className={styles.button}>
                Actualizar
              </button>
            </>
          ) : (
            <button onClick={handleSubmit} className={styles.button}>
              Guardar
            </button>
          )}
        </div>
      </div>
    </ModalBase>
  );
};
