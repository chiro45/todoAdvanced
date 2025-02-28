import React, { ChangeEvent, useState } from "react";
import { ITarea } from "../../../types/ITodos";
import { useTodos } from "../../../hooks/useTodos";

export const Modal = ({ onClose }: { onClose: () => void }) => {
  const { handleCreateTodo } = useTodos();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaLimite: "",
    color: "#ffffff", // Valor por defecto para el color
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!formData.titulo || !formData.fechaLimite) {
      alert("Por favor complete todos los campos.");
      return;
    }

    // Crear la tarea con el estado por defecto "pendiente"
    const newTodo: ITarea = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      estado: "pendiente", // El estado se establece aquí
      fechaLimite: formData.fechaLimite,
      color: formData.color, // Usamos el color del formulario
    };
    handleCreateTodo(newTodo);

    onClose(); // Cerrar el modal después de crear la tarea
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Crear nueva tarea</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              autoComplete="off"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ingrese el título"
              required
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              autoComplete="off"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Ingrese una descripción (opcional)"
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                minHeight: "100px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="fechaLimite">Fecha límite</label>
            <input
              type="date"
              id="fechaLimite"
              name="fechaLimite"
              value={formData.fechaLimite}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="color">Color</label>
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: "#ccc",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Crear tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
