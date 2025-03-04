import React, { useState, useEffect } from "react";
import { ITarea } from "../../../../types/ITodos";
import styles from "./ModalTareas.module.css";
import { ModalBase } from "../ModalBase/ModalBase";
interface TareaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ITarea | null;
  isBacklog: boolean;
  createTareaBacklog?: (tarea: ITarea) => void;
  updateTareaByIdBacklog?: (tarea: ITarea) => void;

  handleCreateTodoBySprintId?: (tarea: ITarea) => void;
  handleUpdateTodoBySprintId?: (tarea: ITarea) => void;
}

const TareaModal: React.FC<TareaModalProps> = ({
  isOpen,
  onClose,
  initialData,
  isBacklog,
  createTareaBacklog,
  updateTareaByIdBacklog,
  handleCreateTodoBySprintId,
  handleUpdateTodoBySprintId,
}) => {
  const [tarea, setTarea] = useState<ITarea>({
    id: "",
    titulo: "",
    descripcion: "",
    estado: "pendiente", // Asegúrate de definir IEstado
    fechaLimite: "",
  });

  useEffect(() => {
    if (initialData) {
      setTarea(initialData);
    } else {
      setTarea({
        id: "",
        titulo: "",
        descripcion: "",
        estado: "pendiente",
        fechaLimite: "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!tarea.titulo || !tarea.fechaLimite) return;
    if (isBacklog && updateTareaByIdBacklog && createTareaBacklog) {
      initialData ? updateTareaByIdBacklog(tarea) : createTareaBacklog(tarea);
    } else {
      if (handleUpdateTodoBySprintId && handleCreateTodoBySprintId) {
        initialData
          ? handleUpdateTodoBySprintId(tarea)
          : handleCreateTodoBySprintId(tarea);
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalBase>
      <div className={styles.modal}>
        <h2>{initialData ? "Editar Tarea" : "Crear Tarea"}</h2>
        <input
          type="text"
          name="titulo"
          value={tarea.titulo}
          onChange={handleChange}
          className={styles.input}
          placeholder="Título"
        />
        <textarea
          name="descripcion"
          value={tarea.descripcion}
          onChange={handleChange}
          className={styles.input}
          placeholder="Descripción"
        />
        <input
          type="date"
          name="fechaLimite"
          value={tarea.fechaLimite}
          onChange={handleChange}
          className={styles.input}
        />
        <div className={styles.actions}>
          <button
            onClick={() => {
              onClose();
            }}
            className={styles.button}
          >
            Cancelar
          </button>
          <button onClick={handleSubmit} className={styles.button}>
            Guardar
          </button>
        </div>
      </div>
    </ModalBase>
  );
};

export default TareaModal;
