import { useEffect } from "react";
import { useTodoBacklog } from "../../../hooks/useTodoBacklog";

export const BacklogScreen = () => {
  const { handleGetTodosBacklog, todos } =
    useTodoBacklog();
  useEffect(() => {
    handleGetTodosBacklog();
  }, []);

  return (
    <div>
      <h1>hola</h1>
      <div>
        {todos.map((el) => (
          <div>
            <p>{el.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
