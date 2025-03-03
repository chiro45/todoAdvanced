import { ChangeEvent, FC, useState } from "react";
import { ISprint, ITarea } from "../../../../types/ITodos";
import styles from "./CardTareasBacklog.module.css";
import { Button } from "../../Button/Button";
type ICardTareas = {
  tarea: ITarea;
  openModal: (tarea: ITarea) => void;
  handleDeleteTodo: (id: string) => void;
  sendToSprintById: (id: string, idSprint: string) => void;
  sprints: ISprint[];
};
export const CardTareasBacklog: FC<ICardTareas> = ({
  tarea,
  openModal,
  handleDeleteTodo,
  sendToSprintById,
  sprints,
}) => {
  const [sprintId, setSprintId] = useState<string | null>(null);

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
              onClick={() => {
                if (sprintId) {
                  sendToSprintById(tarea.id!, sprintId);
                }
              }}
            >
              Enviar a
            </Button>
            <select onChange={handleChangeSelector}>
              {sprints.map((el) => (
                <option value={el.id}>{el.nombre}</option>
              ))}
            </select>
          </div>
        )}
        <Button type="info" onClick={() => openModal(tarea)}>
          Editar
        </Button>
        <Button type="error" onClick={() => handleDeleteTodo(tarea.id!)}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};
