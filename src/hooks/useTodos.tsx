import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { IEstado, ITarea } from "../types/ITodos";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../http/sprintTareas";
import { useTodoStore } from "../store/counterZuztand";

export const useTodos = () => {
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

  const handleGetTodos = async () => {
    setLoading(true);
    try {
      const data = await getTodos();
      setTodos(data);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (newTask: ITarea) => {
    try {
      const createdTodo = await createTodo(newTask);
      if (createdTodo) {
        addNew(createdTodo);
      }
    } catch (error) {
      console.error("Error creando la tarea:", error);
    }
  };

  const handleUpdateTodo = async (
    item: ITarea,
    prevState: { estado: IEstado; orden?: number }
  ) => {
    try {
      editTodo(item.id!, item);
      await updateTodo(item.id!, item);
    } catch (error) {
      editTodo(item.id!, {
        ...item,
        estado: prevState.estado,
      });
      console.error("Error actualizando la tarea:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      deleteTodoZuztand(id);
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    }
  };

  return {
    handleDeleteTodo,
    handleUpdateTodo,
    handleCreateTodo,
    loading,
    handleGetTodos,
    todos,
  };
};
