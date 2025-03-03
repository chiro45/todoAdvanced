import { ITarea } from "../types/ITodos";
import {
  createTareaBacklogController,
  deleteTareaBacklogController,
  getTareaByIdController,
  getTareasBacklogController,
  updateTareaBacklogController,
} from "../data/controllers/backlogController";
import { createTareaByIdBySprintIdController } from "../data/controllers/sprintsController";

export const createTareaBacklog = async (
  tarea: ITarea
): Promise<ITarea | null> => {
  try {
    return await createTareaBacklogController(tarea);
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
    return null;
  }
};

export const getTareasBacklog = async (): Promise<ITarea[]> => {
  try {
    return await getTareasBacklogController();
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
    return [];
  }
};

export const updateTareaByIdBacklog = async (
  item: ITarea
): Promise<ITarea | null> => {
  try {
    return await updateTareaBacklogController(item);
  } catch (error) {
    console.error("Error en updateTareaByIdBacklog:", error);
    return null;
  }
};

export const getTareaByIdBacklog = async (
  id: string
): Promise<ITarea | null> => {
  try {
    return await getTareaByIdController(id);
  } catch (error) {
    console.error("Error en getTareaByIdBacklog:", error);
    return null;
  }
};

export const deleteTareaByIdBacklog = async (id: string): Promise<void> => {
  try {
    await deleteTareaBacklogController(id);
  } catch (error) {
    console.error("Error en deleteTareaByIdBacklog:", error);
  }
};

//mandamos una tarea de una sprint al backlog
export const sendTareaToSprintById = async (
  tarea: ITarea,
  sprintId: string
) => {
  try {
    await createTareaByIdBySprintIdController(sprintId, tarea);
    await deleteTareaByIdBacklog(tarea.id!);
  } catch (error) {}
};
