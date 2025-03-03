import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { todoStore } from "../store/todoStore";
import { ITarea } from "../types/ITodos";
import Swal from "sweetalert2";

import {
  createTareaBacklog,
  deleteTareaByIdBacklog,
  getTareasBacklog,
  sendTareaToSprintById,
  updateTareaByIdBacklog,
} from "../http/backlogTareas";

export const useTodoBacklog = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { todos, setTodos, addNew, editTodo, deleteTodoZuztand } = todoStore(
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
    } catch (error) {
      Swal.fire("Error", "No se pudieron obtener las tareas", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (newTask: ITarea) => {
    addNew(newTask); // Agregamos al estado local

    try {
      await createTareaBacklog(newTask);
      Swal.fire("Éxito", "Tarea creada correctamente", "success");
    } catch (error) {
      console.error("Error creando la tarea:", error);
      deleteTodoZuztand(newTask.id!); // Revertimos en caso de error
      Swal.fire("Error", "No se pudo crear la tarea", "error");
    }
  };

  const handleUpdateTodoBacklog = async (item: ITarea) => {
    const previousState = todos.find((t) => t.id === item.id); // Guardamos el estado previo
    editTodo(item); // Actualizamos en el estado local

    try {
      await updateTareaByIdBacklog(item);
      Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
    } catch (error) {
      console.error("Error actualizando la tarea:", error);
      if (previousState) editTodo(previousState); // Si falla, revertimos
      Swal.fire("Error", "No se pudo actualizar la tarea", "error");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const previousState = todos.find((t) => t.id === id); // Guardamos el estado previo

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    deleteTodoZuztand(id); // Eliminamos del estado local

    try {
      await deleteTareaByIdBacklog(id);
      Swal.fire("Eliminado", "La tarea se eliminó correctamente", "success");
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
      if (previousState) addNew(previousState); // Restauramos la tarea si falla
      Swal.fire("Error", "No se pudo eliminar la tarea", "error");
    }
  };

  const sendToSprintById = async (id: string, idSprint: string) => {
    const previousState = todos.find((t) => t.id === id); // Guardamos el estado previo

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción moverá la tarea al backlog",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, mover",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    deleteTodoZuztand(id); // Eliminamos del estado local

    try {
      await sendTareaToSprintById(previousState!, idSprint);
      Swal.fire(
        "Movida",
        "La tarea se movió al backlog correctamente",
        "success"
      );
    } catch (error) {
      console.error("Error moviendo la tarea al backlog:", error);
      if (previousState) addNew(previousState); // Restauramos la tarea si falla
      Swal.fire("Error", "No se pudo mover la tarea al backlog", "error");
    }
  };

  return {
    handleDeleteTodo,
    handleUpdateTodoBacklog,
    handleCreateTodo,
    loading,
    handleGetTodosBacklog,
    sendToSprintById,
    todos,
  };
};
