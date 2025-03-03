import {
  createTareaByIdBySprintIdController,
  deleteTareaByIdBySprintIdController,
  getTareasBySprintIdController,
  updateTareaByIdBySprintIdController,
} from "../data/controllers/sprintsController";
import { ITarea } from "../types/ITodos";
import { createTareaBacklog, deleteTareaByIdBacklog } from "./backlogTareas";

export const getTareasBySprintId = async (
  idSprint: string
): Promise<ITarea[]> => {
  try {
    return await getTareasBySprintIdController(idSprint);
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
    return [];
  }
};
export const createTareaBySprintId = async (
  idSprint: string,
  tarea: ITarea
): Promise<ITarea | null> => {
  try {
    return await createTareaByIdBySprintIdController(idSprint, tarea);
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
    return null;
  }
};

export const updateTareaBySprintId = async (
  idSprint: string,
  tarea: ITarea
): Promise<ITarea | null> => {
  try {
    return await updateTareaByIdBySprintIdController(idSprint, tarea);
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
    return null;
  }
};

export const deleteTareaBySprintId = async (
  idSprint: string,
  idTarea: string
): Promise<void> => {
  try {
    await deleteTareaByIdBySprintIdController(idSprint, idTarea);
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
  }
};

//mandamos una tarea de una sprint al backlog
export const sendTareaToBacklog = async (tarea: ITarea, sprintId: string) => {
  try {
    await createTareaBacklog(tarea);
    await deleteTareaBySprintId(sprintId, tarea.id!);
  } catch (error) {}
};
