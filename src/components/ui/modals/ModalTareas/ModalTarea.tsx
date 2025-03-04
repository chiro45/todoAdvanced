import React, { useState, useEffect } from "react";
import { ITarea } from "../../../../types/ITodos";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{initialData ? "Editar Tarea" : "Crear Tarea"}</h2>
        <input
          type="text"
          name="titulo"
          value={tarea.titulo}
          onChange={handleChange}
          style={styles.input}
          placeholder="Título"
        />
        <textarea
          name="descripcion"
          value={tarea.descripcion}
          onChange={handleChange}
          style={styles.input}
          placeholder="Descripción"
        />
        <input
          type="date"
          name="fechaLimite"
          value={tarea.fechaLimite}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.actions}>
          <button
            onClick={() => {
              navigate(-1);
              onClose();
            }}
            style={styles.button}
          >
            Cancelar
          </button>
          <button onClick={handleSubmit} style={styles.button}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    minWidth: "300px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
  },
};

export default TareaModal;
