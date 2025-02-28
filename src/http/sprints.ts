import {
  createSprintController,
  putSprintController,
} from "../data/controllers/sprintsController";
import { ISprint } from "../types/ITodos";

export const createSprint = async (
  sprint: ISprint
): Promise<ISprint | null> => {
  try {
    return await createSprintController(sprint);
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
    return null;
  }
};
export const updateSprint = async (
  idSprint: string,
  tarea: ISprint
): Promise<ISprint | null> => {
  try {
    return await putSprintController(idSprint, tarea);
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
    return null;
  }
};

export const updateTareaBySprintId = async (
  idSprint: string,
  sprintUpdated: ISprint
): Promise<ISprint | null> => {
  try {
    return await putSprintController(idSprint, sprintUpdated);
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
