import { FC } from "react";
import { IEstado, ITarea } from "../../../types/ITodos";
import { todoStore } from "../../../store/todoStore";
import { useTodos } from "../../../hooks/useTodos";

type ICardTodo = {
  todo: ITarea;
};

export const CardTodo: FC<ICardTodo> = ({ todo }) => {
  const todos = todoStore((state) => state.todos);

  const { handleDeleteTodo, handleUpdateTodo } = useTodos();
  // Función para manejar el cambio de estado de la tarea
  const handleStateChange = (id: string, newState: string) => {
    const item = todos.find((el) => el.id === id);
    if (item) {
      handleUpdateTodo(
        { ...item, estado: newState as IEstado },
        { estado: item.estado as IEstado }
      );
    }
  };
  return (
    <div
      key={todo.id}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: `${todo.color || "#fff"}`,
      }}
    >
      <p>{todo.titulo}</p>
      <p>{todo.descripcion}</p>
      {/* Selector para cambiar el estado */}
      <select
        value={todo.estado}
        onChange={(e) => handleStateChange(todo.id!, e.target.value)}
      >
        <option value="pendiente">Pendiente</option>
        <option value="en_progreso">En Progreso</option>
        <option value="completado">Completado</option>
      </select>
      <button onClick={() => handleDeleteTodo(todo.id!)}>Delete</button>
    </div>
  );
};
