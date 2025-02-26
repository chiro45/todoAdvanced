export type IEstado = "pendiente" | "en_progreso" | "completado";
export type EndopointParam =
  | "tareasPendientes"
  | "tareasProgresso"
  | "tareasCompleted";
export interface ITodo {
  id?: string;
  titulo: string;
  descripcion?: string;
  estado: IEstado;
  fechaLimite: string;
  orden: number;
}
