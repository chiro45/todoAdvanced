import { ChangeEvent, FC, useState } from "react";
import { ISprint, ITarea } from "../../../../types/ITodos";
import styles from "./CardTareasBacklog.module.css";
import { Button } from "../../Button/Button";
import {
  IconCubeSend,
  IconEye,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";

type ICardTareas = {
  tarea: ITarea;
  openModal: (tarea: ITarea) => void;
  openView: (tarea: ITarea) => void;

  handleDeleteTodo: (id: string) => void;
  sendToSprintById?: (id: string, idSprint: string) => void;
  sprints: ISprint[];
};
export const CardTareasBacklog: FC<ICardTareas> = ({
  tarea,
  openModal,
  handleDeleteTodo,
  sendToSprintById,
  openView,
  sprints,
}) => {
  const [sprintId, setSprintId] = useState<string>("-1");
  const handleChangeSelector = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSprintId(value);
  };

  return (
    <div key={tarea.id} className={styles.containerTareaBaklog}>
      <div>
        <p>Titulo: {tarea.titulo}</p>
        <p>Descripcion: {tarea.descripcion?.slice(0, 50)}...</p>
      </div>
      <div>
        {sprints.length > 0 && (
          <div>
            <Button
              type="success"
              disabled={sprintId === "-1"}
              handleonClick={() => {
                if (sendToSprintById) {
                  sendToSprintById(tarea.id!, sprintId);
                }
              }}
            >
              Enviar a <IconCubeSend />
            </Button>
            <select onChange={handleChangeSelector}>
              <option value={"-1"}>Seleccione una sprint</option>
              {sprints.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
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
          handleonClick={() => {
            openModal(tarea);
          }}
        >
          <IconPencil />
        </Button>
        <Button type="error" handleonClick={() => handleDeleteTodo(tarea.id!)}>
          <IconTrash />
        </Button>
      </div>
    </div>
  );
};
