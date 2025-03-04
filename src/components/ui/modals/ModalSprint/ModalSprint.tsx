import React, { useState, useEffect } from "react";
import { ISprint } from "../../../../types/ITodos";

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
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{initialData ? "Editar Sprint" : "Crear Sprint"}</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Inserte un nombre"
          value={sprint.nombre}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="fechaInicio"
          value={sprint.fechaInicio}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="fechaCierre"
          value={sprint.fechaCierre}
          onChange={handleChange}
          style={styles.input}
        />
       
        <div style={styles.actions}>
          <button onClick={onClose} style={styles.button}>
            Cancelar
          </button>
          {initialData ? (
            <>
              <button onClick={handleDelete} style={styles.button}>
                Eliminar
              </button>
              <button onClick={handleSubmit} style={styles.button}>
                Actualizar
              </button>
            </>
          ) : (
            <button onClick={handleSubmit} style={styles.button}>
              Guardar
            </button>
          )}
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
