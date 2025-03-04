import React, { useState, useEffect } from "react";
import { ITarea } from "../../../../types/ITodos";
import styles from "./ModalTareas.module.css";
import { ModalBase } from "../ModalBase/ModalBase";
import { InputField } from "../../Input/Input";
import { TexArea } from "../../TextArea/TexArea";
import { Button } from "../../Button/Button";
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
    console.log(e);
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
