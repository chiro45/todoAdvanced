import { FC, useState } from "react";
import { IEstado, ISprint, ITarea } from "../../../../types/ITodos";
import styles from "./CardTareasSprint.module.css";
import { Button } from "../../Button/Button";
import {
  IconChevronsRight,
  IconCubeSend,
  IconEye,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useTodoSprint } from "../../../../hooks/useTodoSprint";
type ICardTareas = {
  tarea: ITarea;
  openModal: (tarea: ITarea) => void;
  openView: (tarea: ITarea) => void;
  handleDeleteTodo: (id: string) => void;
  sendToBacklog: (id: string) => void;
  sprints: ISprint[];
  isBacklog?: boolean;
};
const estados: { label: string; value: IEstado }[] = [
  { label: "Pendiente", value: "pendiente" },
  { label: "En Progreso", value: "en_progreso" },
  { label: "Completado", value: "completado" },
];
export const CardTareasSprint: FC<ICardTareas> = ({
  tarea,
  openModal,
  openView,
  handleDeleteTodo,
  sendToBacklog,
}) => {
  const { idSprint } = useParams<{
    idSprint: string;
  }>();
  const [openState, setOpenStates] = useState(false);

  const { handleUpdateTodoBySprintId } = useTodoSprint({ idSprint: idSprint! });

  const handleNextStateSelect = async (tarea: ITarea, estado: IEstado) => {
    const updatedTarea = { ...tarea, estado: estado };
    await handleUpdateTodoBySprintId(updatedTarea);
  };

  const handleNextState = async (tarea: ITarea) => {
    const nextState: Record<IEstado, IEstado> = {
      pendiente: "en_progreso",
      en_progreso: "completado",
      completado: "pendiente",
    };

    const updatedTarea = { ...tarea, estado: nextState[tarea.estado] };

    await handleUpdateTodoBySprintId(updatedTarea);
  };

  return (
    <div key={tarea.id} className={styles.containerTareaBaklog}>
      <div className={styles.contentTarea}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          <p>Titulo: {tarea.titulo}</p>
          <p>Descripcion: {tarea.descripcion?.slice(0, 20)}...</p>
          <p>Fecha limite: {tarea.fechaLimite}</p>
        </div>
      </div>
      <div className={styles.tareaActions}>
        <Button
          stylesCustom={{ padding: "4px 6px" }}
          type="success"
          handleonClick={() => {
            sendToBacklog(tarea.id!);
          }}
        >
          Enviar al Backlog <IconCubeSend />
        </Button>
        <div className={styles.containerChangeState}>
          <div
            onClick={() => {
              setOpenStates(!openState);
            }}
            className={styles.changeState}
          >
            <div>{tarea.estado}</div>
            {openState && (
              <ul className={styles.desplegableState}>
                {estados.map(({ label, value }) => (
                  <li
                    key={value}
                    onClick={() => {
                      setOpenStates(false);
                      handleNextStateSelect(tarea, value);
                    }}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            onClick={() => {
              handleNextState(tarea);
            }}
            className={styles.nextState}
          >
            <IconChevronsRight />
          </div>
        </div>
        <Button
          type="info"
          stylesCustom={{ padding: "4px 6px" }}
          handleonClick={() => {
            openView(tarea);
          }}
        >
          <IconEye />
        </Button>
        <Button
          type="info"
          stylesCustom={{ padding: "4px 6px" }}
          handleonClick={() => {
            openModal(tarea);
          }}
        >
          <IconPencil />
        </Button>
        <Button
          stylesCustom={{ padding: "4px 6px" }}
          type="error"
          handleonClick={() => handleDeleteTodo(tarea.id!)}
        >
          <IconTrash />
        </Button>
      </div>
    </div>
  );
};
