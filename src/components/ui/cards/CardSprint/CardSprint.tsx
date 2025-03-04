import { FC } from "react";
import { ISprint } from "../../../../types/ITodos";
import styles from "./CardSprint.module.css";
import { Button } from "../../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { IconPencil, IconTrash } from "@tabler/icons-react";

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
  const location = useLocation();
  return (
    <div
      className={`${styles.card} ${
        location.pathname === `/sprint/${sprint.id}` ? styles.cardActive : ""
      }`}
      onClick={() => {
        navigate(`/sprint/${sprint.id}`);
      }}
    >
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
        <Button
          stylesCustom={{ width: "3vh", height: "3vh", padding: "2px 4px" }}
          type="info"
          handleonClick={() => openSprintModal(sprint)}
        >
          <IconPencil />
        </Button>
        <Button
          stylesCustom={{ width: "3vh", height: "3vh", padding: "2px 4px" }}
          type="error"
          handleonClick={() => handleDeleteSprint(sprint.id)}
        >
          <IconTrash />
        </Button>
      </div>
    </div>
  );
};
