import { useState } from "react";
import { useSprintStore } from "../store/sprintStore";
import { useShallow } from "zustand/shallow";
import {
  createSprint,
  deleteSprint,
  getAllSprints,
  updateSprint,
} from "../http/sprints";
import Swal from "sweetalert2";
import { ISprint } from "../types/ITodos";
export const useSprints = () => {
  const [loading, setLoading] = useState(false);

  const {
    sprints,
    setSprintsZustand,
    addNewSprintZustand,
    editSprintZustand,
    deleteSprintZustand,
  } = useSprintStore(
    useShallow((state) => ({
      sprints: state.sprints,
      setSprintsZustand: state.setSprintsZustand,
      addNewSprintZustand: state.addNewSprintZustand,
      editSprintZustand: state.editSprintZustand,
      deleteSprintZustand: state.deleteSprintZustand,
    }))
  );

  const handleGetAllSprints = async () => {
    setLoading(true);

    try {
      const sprints = await getAllSprints();
      setSprintsZustand(sprints);
    } catch (error) {
      Swal.fire("Error", "No se pudieron obtener las tareas", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSprint = async (newSprint: ISprint) => {
    addNewSprintZustand(newSprint); // Agregamos al estado local
    try {
      await createSprint(newSprint);
      Swal.fire("Éxito", "Tarea creada correctamente", "success");
    } catch (error) {
      console.error("Error creando la tarea:", error);
      deleteSprintZustand(newSprint.id!); // Revertimos en caso de error
      Swal.fire("Error", "No se pudo crear la tarea", "error");
    }
  };

  const handleUpdateSprint = async (item: ISprint) => {
    const previousState = sprints.find((t) => t.id === item.id); // Guardamos el estado previo
    editSprintZustand(item); // Actualizamos en el estado local

    try {
      await updateSprint(item);
      Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
    } catch (error) {
      console.error("Error actualizando la tarea:", error);
      if (previousState) editSprintZustand(previousState); // Si falla, revertimos
      Swal.fire("Error", "No se pudo actualizar la tarea", "error");
    }
  };

  const handleDeleteSprint = async (id: string) => {
    const previousState = sprints.find((sprint) => sprint.id === id); // Guardamos el estado previo

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    deleteSprintZustand(id); // Eliminamos del estado local

    try {
      Swal.fire("Eliminado", "La tarea se eliminó correctamente", "success");
      await deleteSprint(id);
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
      if (previousState) addNewSprintZustand(previousState); // Restauramos la tarea si falla
      Swal.fire("Error", "No se pudo eliminar la tarea", "error");
    }
  };
  return {
    handleGetAllSprints,
    handleCreateSprint,
    handleUpdateSprint,
    handleDeleteSprint,
    sprints,
    loading,
  };
};
