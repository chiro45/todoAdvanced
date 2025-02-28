import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { useTodoStore } from "../store/counterZuztand";
import { ITarea } from "../types/ITodos";
import { getTareasBacklog, updateTareaByIdBacklog } from "../http/backlogTareas";

export const useTodoBacklog = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { todos, setTodos, addNew, editTodo, deleteTodoZuztand } = useTodoStore(
    useShallow((state) => ({
      todos: state.todos,
      setTodos: state.setTodos,
      addNew: state.addNew,
      editTodo: state.editTodo,
      deleteTodoZuztand: state.deleteTodo,
    }))
  );

  const handleGetTodosBacklog = async () => {
    setLoading(true);

    try {
      const tareas = await getTareasBacklog();
      setTodos(tareas);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (newTask: ITarea) => {
    try {
    } catch (error) {
      console.error("Error creando la tarea:", error);
    }
  };

  const handleUpdateTodoBacklog = async (item: ITarea) => {
    try {
      await updateTareaByIdBacklog(item);
    } catch (error) {
      console.error("Error actualizando la tarea:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      deleteTodoZuztand(id);
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    }
  };

  return {
    handleDeleteTodo,
    handleUpdateTodoBacklog,
    handleCreateTodo,
    loading,
    handleGetTodosBacklog,
    todos,
  };
};
