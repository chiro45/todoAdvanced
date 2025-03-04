import { useShallow } from "zustand/shallow";
import { todoStore } from "../store/todoStore";
import { ITarea } from "../types/ITodos";
import Swal from "sweetalert2";

import { getTareasBySprintId, sendTareaToBacklog } from "../http/sprintTareas";
import {
  createTareaByIdBySprintIdController,
  deleteTareaByIdBySprintIdController,
  updateTareaByIdBySprintIdController,
} from "../data/controllers/sprintsController";
import { useCallback } from "react";
import { handleGenerateRandomId } from "../utils/generateRandomId";

type IUseTodoSprint = { idSprint: string };

export const useTodoSprint = ({ idSprint }: IUseTodoSprint) => {
  const { todos, setTodos, addNew, editTodo, deleteTodoZuztand } = todoStore(
    useShallow((state) => ({
      todos: state.todos,
      setTodos: state.setTodos,
      addNew: state.addNew,
      editTodo: state.editTodo,
      deleteTodoZuztand: state.deleteTodo,
    }))
  );

  /** ✅ Función genérica para manejar errores */
  const handleError = (error: any, action: string, rollback?: () => void) => {
    console.error(`Error ${action}:`, error);
    if (rollback) rollback();
    Swal.fire("Error", `No se pudo ${action} la tarea`, "error");
  };

  /** ✅ Obtener tareas del Sprint */
  const handleGetTodosBySprintId = useCallback(async () => {
    try {
      const tareas = await getTareasBySprintId(idSprint);
      setTodos(tareas);
    } catch (error) {
      handleError(error, "obtener");
    }
  }, [idSprint, setTodos]);

  /** ✅ Crear tarea */
  const handleCreateTodoBySprintId = async (newTask: ITarea) => {
    const taskWithId = {
      ...newTask,
      id: handleGenerateRandomId(),
    };
    addNew(taskWithId);

    try {
      await createTareaByIdBySprintIdController(idSprint, taskWithId);
      Swal.fire("Éxito", "Tarea creada correctamente", "success");
    } catch (error) {
      handleError(error, "crear", () => deleteTodoZuztand(newTask.id!));
    }
  };

  /** ✅ Actualizar tarea */
  const handleUpdateTodoBySprintId = async (
    item: ITarea,
    showalert?: boolean
  ) => {
    const previousState = todos.find((t) => t.id === item.id);
    editTodo(item);

    try {
      await updateTareaByIdBySprintIdController(idSprint, item);
      if (showalert)
        Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
    } catch (error) {
      handleError(
        error,
        "actualizar",
        () => previousState && editTodo(previousState)
      );
    }
  };

  /** ✅ Eliminar tarea */
  const handleDeleteTodo = async (id: string) => {
    const previousState = todos.find((t) => t.id === id);

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;
    deleteTodoZuztand(id);

    try {
      await deleteTareaByIdBySprintIdController(idSprint, id);
      Swal.fire("Eliminado", "La tarea se eliminó correctamente", "success");
    } catch (error) {
      handleError(
        error,
        "eliminar",
        () => previousState && addNew(previousState)
      );
    }
  };

  /** ✅ Mover tarea a Backlog */
  const sendToBacklog = async (id: string) => {
    const previousState = todos.find((t) => t.id === id);

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción moverá la tarea al backlog",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, mover",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;
    deleteTodoZuztand(id);

    try {
      await sendTareaToBacklog(previousState!, idSprint);
      Swal.fire(
        "Movida",
        "La tarea se movió al backlog correctamente",
        "success"
      );
    } catch (error) {
      handleError(
        error,
        "mover al backlog",
        () => previousState && addNew(previousState)
      );
    }
  };

  return {
    handleDeleteTodo,
    handleUpdateTodoBySprintId,
    handleCreateTodoBySprintId,
    handleGetTodosBySprintId,
    sendToBacklog,
    todos,
  };
};
