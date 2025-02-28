import { useEffect, useState } from "react";
import { useTodos } from "../../../hooks/useTodos";
import { CardTodo } from "../../ui/CardTodo/CardTodo";
import { Modal } from "../../ui/Modal/Modal";

export const SprintScreen = () => {
    
  const { handleGetTodos, todos } = useTodos();

  useEffect(() => {
    handleGetTodos();
  }, []);

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Add new Todo
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "50vh",
        }}
      >
        {/* Lista de To Do */}
        <div
          style={{
            width: "30%",
            backgroundColor: "#f0f0f0",
            padding: "10px",
          }}
        >
          <h3>To Do</h3>
          {todos.map((todo) => (
            <>
              {todo.estado === "pendiente" && (
                <CardTodo key={todo.id} todo={todo} />
              )}
            </>
          ))}
        </div>

        {/* Lista de En Progreso */}
        <div
          style={{
            width: "30%",
            backgroundColor: "#f0f0f0",
            padding: "10px",
          }}
        >
          <h3>En Progreso</h3>
          {todos.map((todo) => (
            <>
              {todo.estado === "en_progreso" && (
                <CardTodo key={todo.id} todo={todo} />
              )}
            </>
          ))}
        </div>

        {/* Lista de Completado */}
        <div
          style={{
            width: "30%",
            backgroundColor: "#f0f0f0",
            padding: "10px",
          }}
        >
          <h3>Completado</h3>
          {todos.map((todo) => (
            <>
              {todo.estado === "completado" && (
                <CardTodo key={todo.id} todo={todo} />
              )}
            </>
          ))}
        </div>
      </div>
      {openModal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};
