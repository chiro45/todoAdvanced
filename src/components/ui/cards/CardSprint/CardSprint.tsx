import { FC } from "react";
import { ISprint } from "../../../../types/ITodos";
import styles from "./CardSprint.module.css";
import { Button } from "../../Button/Button";
import { useNavigate } from "react-router-dom";

type ICardSprint = {
  sprint: ISprint;
  openSprintModal: (sprint?: ISprint) => void;
  handleDeleteSprint: (id: string) => Promise<void>;
};

export const CardSprint: FC<ICardSprint> = ({
  sprint,
  handleDeleteSprint,
  openSprintModal,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{sprint.nombre}</h3>
        <p className={styles.cardDate}>
          <b>Inicio:</b> {sprint.fechaInicio}
        </p>
        <p className={styles.cardDate}>
          <b>Cierre:</b> {sprint.fechaCierre}
        </p>
      </div>
      <div className={styles.cardButtons}>
        <Button type="info" onClick={() => openSprintModal(sprint)}>
          Editar
        </Button>
        <Button type="error" onClick={() => handleDeleteSprint(sprint.id)}>
          Eliminar
        </Button>
        <Button type="warning" onClick={() => navigate(`/sprint/${sprint.id}`)}>
          Ir al sprint
        </Button>
      </div>
    </div>
  );
};
