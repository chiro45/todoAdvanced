import { useEffect } from "react";
import { useTodoBacklog } from "../../../hooks/useTodoBacklog";

export const BacklogScreen = () => {
  const { handleGetTodosBacklog, handleUpdateTodoBacklog, todos } =
    useTodoBacklog();
  useEffect(() => {
    handleGetTodosBacklog();
  }, []);

  const handleEditFirst = async () => {
    let item = todos[0];
    const todocito = { ...item, descripcion: "raul" };
    await handleUpdateTodoBacklog(todocito);
  };

  return (
    <div>
      <h1>hola</h1>
      <div>
        {todos.map((el) => (
          <div>
            <p>{el.descripcion}</p>
          </div>
        ))}
        <button onClick={handleEditFirst}>edit</button>
      </div>
    </div>
  );
};
