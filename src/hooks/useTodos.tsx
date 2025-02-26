import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { IEstado, ITodo } from "../types/ITodos";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../http/todos";
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

  const handleCreateTodo = async () => {
    const newTask: ITodo = {
      id: new Date().toISOString(),
      titulo: "Nueva tarea",
      descripcion: `Descripción opcional${
        todos.filter((el) => el.estado === "pendiente").length + 1
      }`,
      estado: "pendiente",
      fechaLimite: "2024-03-10",
      orden: todos.filter((el) => el.estado === "pendiente").length , // Se asigna el orden dinámicamente
    };

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
    item: ITodo,
    prevState: { estado: IEstado; orden?: number }
  ) => {
    try {
      editTodo(item.id!, item);
      await updateTodo(item.id!, item);
    } catch (error) {
      editTodo(item.id!, {
        ...item,
        estado: prevState.estado,
        orden: prevState.orden || item.orden,
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
