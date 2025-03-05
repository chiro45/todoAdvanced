import React, { useState, useEffect } from "react";
import { ITarea } from "../../../../types/ITodos";
import styles from "./ModalTareas.module.css";
import { ModalBase } from "../ModalBase/ModalBase";
import { InputField } from "../../Input/Input";
import { TexArea } from "../../TextArea/TexArea";
import { Button } from "../../Button/Button";
import { todoStore } from "../../../../store/todoStore";
interface TareaModalProps {
  isOpen: boolean;
  onClose: () => void;
  isBacklog: boolean;
  createTareaBacklog?: (tarea: ITarea) => void;
  updateTareaByIdBacklog?: (tarea: ITarea) => void;

  handleCreateTodoBySprintId?: (tarea: ITarea) => void;
  handleUpdateTodoBySprintId?: (tarea: ITarea) => void;
}

const initialState: ITarea = {
  id: "",
  titulo: "",
  descripcion: "",
  estado: "pendiente",
  fechaLimite: "",
};

const TareaModal: React.FC<TareaModalProps> = ({
  isOpen,
  onClose,
  isBacklog,
  createTareaBacklog,
  updateTareaByIdBacklog,
  handleCreateTodoBySprintId,
  handleUpdateTodoBySprintId,
}) => {
  const [tarea, setTarea] = useState<ITarea>(initialState);
  const todoActive = todoStore((state) => state.todoActive);
  useEffect(() => {
    if (todoActive) {
      setTarea(todoActive);
    } else {
      setTarea(initialState);
    }
  }, [todoActive]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!tarea.titulo || !tarea.fechaLimite) return;
    if (isBacklog && updateTareaByIdBacklog && createTareaBacklog) {
      todoActive ? updateTareaByIdBacklog(tarea) : createTareaBacklog(tarea);
    } else {
      if (handleUpdateTodoBySprintId && handleCreateTodoBySprintId) {
        todoActive
          ? handleUpdateTodoBySprintId(tarea)
          : handleCreateTodoBySprintId(tarea);
      }
    }
    setTarea(initialState);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <ModalBase>
      <div className={styles.modal}>
        <h2>{todoActive ? "Editar Tarea" : "Crear Tarea"}</h2>
        <InputField
          type={"text"}
          name={"titulo"}
          value={tarea.titulo}
          handleChange={handleChange}
          className={styles.input}
          placeholder="Título"
        />
        <TexArea
          name="descripcion"
          value={tarea.descripcion}
          handleChange={handleChange}
          className={styles.input}
          placeholder="Descripción"
        />
        <InputField
          type="date"
          name="fechaLimite"
          value={tarea.fechaLimite}
          handleChange={handleChange}
          className={styles.input}
        />
        <div className={styles.actions}>
          <Button
            handleonClick={() => {
              onClose();
            }}
            type="error"
          >
            Cancelar
          </Button>
          <Button type="success" handleonClick={handleSubmit}>
            Guardar
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};

export default TareaModal;
