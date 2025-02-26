import { ITodo } from "../types/ITodos";

export const getTodos = async (): Promise<ITodo[]> => {
  try {
    const response = await fetch("http://localhost:3000/tareas");
    const data: ITodo[] = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const createTodo = async (newTodo: ITodo): Promise<ITodo | null> => {
  try {
    const response = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newTodo, id: new Date().toISOString() }),
    });

    if (!response.ok) {
      throw new Error("Error al crear la tarea");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en createTodo:", error);
    return null;
  }
};

export const updateTodo = async (
  id: string,
  item: ITodo
): Promise<ITodo | null> => {
  try {
    const response = await fetch(`http://localhost:3000/tareas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en updateTodo:", error);
    return null;
  }
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:3000/tareas/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }

    return true;
  } catch (error) {
    console.error("Error en deleteTodo:", error);
    return false;
  }
};
