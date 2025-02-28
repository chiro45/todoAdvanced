export type IEstado = "pendiente" | "en_progreso" | "completado";

export interface ITarea {
  id?: string;
  titulo: string;
  descripcion?: string;
  estado: IEstado;
  fechaLimite: string;
  color?: string;
}

export interface IBacklog {
  tareas: ITarea[];
}
export interface ISprintsList {
  sprints: ISprint[];
}
export interface ISprint {
  id: string;
  fechaInicio: string;
  fechaCierre: string;
  tareas: ITarea[];
  color?: string;
}
