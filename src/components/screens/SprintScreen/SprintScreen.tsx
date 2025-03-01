import { useEffect } from "react";
import { useTodoSprint } from "../../../hooks/useTodoSprint";

const idTemporal = "sprint1";

export const SprintScreen = () => {
  const { handleGetTodosBySprintId, todos } = useTodoSprint({idSprint:idTemporal});
  useEffect(() => {
    handleGetTodosBySprintId();
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
