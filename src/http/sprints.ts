import {
  createSprintController,
  getSprintsController,
  putSprintController,
  putSprintsController,
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

export const deleteSprint = async (idSprint: string) => {
  try {
    let sprints = await getSprintsController();
    sprints.filter((el) => el.id !== idSprint);
    await putSprintsController(sprints);
  } catch (error) {
    console.error("Error en getTareasBacklog:", error);
  }
};
