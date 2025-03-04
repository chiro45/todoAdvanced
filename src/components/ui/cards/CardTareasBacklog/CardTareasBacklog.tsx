import { ChangeEvent, FC, useState } from "react";
import { ISprint, ITarea } from "../../../../types/ITodos";
import styles from "./CardTareasBacklog.module.css";
import { Button } from "../../Button/Button";
import { IconCubeSend, IconPencil, IconTrash } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
type ICardTareas = {
  tarea: ITarea;
  openModal: (tarea: ITarea) => void;
  handleDeleteTodo: (id: string) => void;
  sendToSprintById?: (id: string, idSprint: string) => void;
  sprints: ISprint[];
};
export const CardTareasBacklog: FC<ICardTareas> = ({
  tarea,
  openModal,
  handleDeleteTodo,
  sendToSprintById,
  sprints,
}) => {
  const [sprintId, setSprintId] = useState<string>("-1");
  const handleChangeSelector = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSprintId(value);
  };

  const navigate = useNavigate();

  const location = useLocation();

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
          handleonClick={() => {
            openModal(tarea);
            if (location.pathname !== "/") {
              navigate(`${location.pathname}/${tarea.id}`);
            } else {
              navigate(`/${tarea.id}`);
            }
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
