import {
  createSprintController,
  getSprintsController,
  putSprintController,
  putSprintsController,
} from "../data/controllers/sprintsController";
import { ISprint } from "../types/ITodos";
import { handleGenerateRandomId } from "../utils/generateRandomId";

export const getAllSprints = async (): Promise<ISprint[]> => {
  try {
    return await getSprintsController();
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
    return [];
  }
};

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
  sprintUpdated: ISprint
): Promise<ISprint | null> => {
  try {
    const { id } = sprintUpdated;
    return await putSprintController(id, sprintUpdated);
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
    return null;
  }
};

export const deleteSprint = async (idSprint: string) => {
  try {
    const sprints = await getSprintsController();
    const result = sprints.filter((el) => el.id !== idSprint);
    await putSprintsController(result);
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
  }
};
