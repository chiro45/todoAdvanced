import { create } from "zustand";
import { ITarea } from "../types/ITodos";

interface ITodoStore {
  todos: ITarea[];
  setTodos: (newArrTodos: ITarea[]) => void;
  addNew: (newTodo: ITarea) => void;
  editTodo: (updatedTask: Partial<ITarea>) => void;
  deleteTodo: (id: string) => void;
}

export const todoStore = create<ITodoStore>((set) => ({
  todos: [],
  setTodos: (newArrTodos) => set(() => ({ todos: newArrTodos })),
  addNew: (newTodo) =>
    set((state) => ({
      todos: [...state.todos, newTodo],
    })),
  editTodo: (updatedTask) =>
    set((state) => {
      // Comprobar si ya existe el mismo orden y estado
      const arrTodos = state.todos.map((el) =>
        el.id === updatedTask.id! ? { ...el, ...updatedTask } : el
      );

      return { todos: arrTodos };
    }),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));
