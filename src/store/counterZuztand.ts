import { create } from "zustand";
import { ITodo } from "../types/ITodos";

interface ITodoStore {
  todos: ITodo[];
  setTodos: (newArrTodos: ITodo[]) => void;
  addNew: (newTodo: ITodo) => void;
  editTodo: (id: string, updatedTask: Partial<ITodo>) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<ITodoStore>((set) => ({
  todos: [],

  setTodos: (newArrTodos) => set(() => ({ todos: newArrTodos })),

  addNew: (newTodo) =>
    set((state) => ({
      todos: [...state.todos, newTodo],
    })),

  editTodo: (id, updatedTask) =>
    set((state) => {
      // Comprobar si ya existe el mismo orden y estado
      const arrTodos = state.todos.map((el) =>
        el.id === id ? { ...el, ...updatedTask } : el
      );

      return { todos: arrTodos };
    }),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));
