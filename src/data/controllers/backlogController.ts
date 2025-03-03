import { createTareaBacklog } from "../../http/backlogTareas";
import { deleteTareaBySprintId } from "../../http/sprintTareas";
import { IBacklog, ITarea } from "../../types/ITodos";
import axios from "axios";

const API_URL = "http://localhost:3000/backlog";
//nos permite modificar el objeto global backlog
export const putTareasBacklog = async (tareasList: ITarea[]) => {
  try {
    const response = await axios.put<IBacklog>(API_URL, {
      tareas: tareasList,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error en putTareasBacklog: ${error}`);
  }
};
//traemos todas las tareas del backlog
export const getTareasBacklogController = async (): Promise<ITarea[]> => {
  try {
    const response = await axios.get<{ tareas: ITarea[] }>(API_URL);
    return response.data.tareas;
  } catch (error) {
    console.error("Error en getTareas:", error);
    return [];
  }
};
//permite modificar una tarea dentro del backlog
export const updateTareaBacklogController = async (
  item: ITarea
): Promise<ITarea> => {
  try {
    let tareas = await getTareasBacklogController();
    tareas = tareas.map((el) => (el.id === item.id ? { ...el, ...item } : el)); // Corrección aquí
    await putTareasBacklog(tareas);
    return item;
  } catch (error) {
    throw new Error(`Error al actualizar tarea: ${error}`);
  }
};
//nos permite traer una tarea del backlog por id
export const getTareaByIdController = async (id: string): Promise<ITarea> => {
  try {
    let tareas = await getTareasBacklogController();
    const result = tareas.find((el) => el.id === id);
    if (result) {
      return result;
    } else {
      throw new Error(`No se encontró la tarea con ID: ${id}`);
    }
  } catch (error) {
    throw new Error(`Error al obtener tarea por ID: ${error}`);
  }
};
//eliminamos una tarea del backlog
export const deleteTareaBacklogController = async (id: string) => {
  try {
    const tareas = await getTareasBacklogController();
    const result = tareas.filter((el) => el.id !== id);
    await putTareasBacklog(result);
  } catch (error) {
    throw new Error(`Error al eliminar tarea: ${error}`);
  }
};
//creamos una tarea en el backlog
export const createTareaBacklogController = async (
  item: ITarea
): Promise<ITarea> => {
  try {
    let tareas = await getTareasBacklogController();
    tareas.push(item);
    await putTareasBacklog(tareas);
    return item;
  } catch (error) {
    throw new Error(`Error al crear tarea: ${error}`);
  }
};
//mandamos una tarea de una sprint al backlog
export const sendTareaToBacklog = async (tarea: ITarea, sprintId: string) => {
  try {
    await createTareaBacklog(tarea);
    await deleteTareaBySprintId(tarea.id!, sprintId);
  } catch (error) {}
};
