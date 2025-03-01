import axios from "axios";
import { ISprint, ISprintsList, ITarea } from "../../types/ITodos";

const API_URL = "http://localhost:3000/sprintList";

//nos permite modificar el objeto global sprints
export const putSprintsController = async (sprints: ISprint[]) => {
  try {
    const response = await axios.put<ISprintsList>(API_URL, { sprints });
    return response.data;
  } catch (error) {
    throw new Error(`Error en putSprintsController: ${error}`);
  }
};

//traemos todas las sprints
export const getSprintsController = async (): Promise<ISprint[]> => {
  try {
    const response = await axios.get<{ sprints: ISprint[] }>(API_URL);
    return response.data.sprints;
  } catch (error) {
    console.error("Error en getSprints:", error);
    return [];
  }
};
//creamos una nueva sprint
export const createSprintController = async (sprint: ISprint) => {
  try {
    const sprints = await getSprintsController();
    await putSprintsController([...sprints, sprint]); // Agregar sin mutar el array original
    return sprint;
  } catch (error) {
    throw new Error("Error al crear el Sprint");
  }
};
//editamos una sprint
export const putSprintController = async (
  idSprint: string,
  sprint: ISprint
) => {
  try {
    const sprints = await getSprintsController();
    const updatedSprints = sprints.map((el) =>
      el.id === idSprint ? sprint : el
    );

    await putSprintsController(updatedSprints);
    return sprint;
  } catch (error) {
    throw new Error("Error al actualizar el Sprint");
  }
};
//editamos todas las tareas de la sprint
export const putSprintsTareasController = async (
  idSprint: string,
  tareas: ITarea[]
) => {
  try {
    const sprints = await getSprintsController();
    const updatedSprints = sprints.map((el) =>
      el.id === idSprint ? { ...el, tareas } : el
    );

    await putSprintsController(updatedSprints);
  } catch (error) {
    throw new Error("Error al actualizar tareas del Sprint");
  }
};
//traemos todas las tareas de una sprint
export const getTareasBySprintIdController = async (
  idSprint: string
): Promise<ITarea[]> => {
  try {
    const sprints = await getSprintsController();
    const result = sprints.find((el) => el.id === idSprint);
    console.log(result);
   
  } catch (error) {
    console.error("Error en getTareasBySprintId:", error);
    return [];
  }
};
//actializamos una tarea dentro del sprint
export const updateTareaByIdBySprintIdController = async (
  idSprint: string,
  item: ITarea
): Promise<ITarea> => {
  try {
    let tareas = await getTareasBySprintIdController(idSprint);
    tareas = tareas.map((el) => (el.id === item.id ? { ...el, ...item } : el));

    await putSprintsTareasController(idSprint, tareas);
    return item;
  } catch (error) {
    throw new Error("Error al actualizar la tarea en el Sprint");
  }
};
//creamos una tarea dentro del sprint
export const createTareaByIdBySprintIdController = async (
  idSprint: string,
  newTarea: ITarea
): Promise<ITarea> => {
  try {
    let tareas = await getTareasBySprintIdController(idSprint);
    await putSprintsTareasController(idSprint, [...tareas, newTarea]);
    return newTarea;
  } catch (error) {
    throw new Error("Error al crear la tarea en el Sprint");
  }
};
//eliminamos una tarea dentro de la sprint
export const deleteTareaByIdBySprintIdController = async (
  idSprint: string,
  idTarea: string
) => {
  try {
    const tareas = (await getTareasBySprintIdController(idSprint)).filter(
      (el) => el.id !== idTarea
    );
    await putSprintsTareasController(idSprint, tareas);
  } catch (error) {
    throw new Error("Error al eliminar la tarea del Sprint");
  }
};
