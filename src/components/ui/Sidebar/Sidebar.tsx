import { useLocation, useNavigate } from "react-router-dom";
import { IconBook } from "@tabler/icons-react";
import styles from "./Sidebar.module.css";
import { useSprints } from "../../../hooks/useSprints";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ITodos";
import { CardSprint } from "../cards/CardSprint/CardSprint";
import { ModalSprint } from "../modals/ModalSprint/ModalSprint";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    sprints,
    handleGetAllSprints,
    handleCreateSprint,
    handleUpdateSprint,
    handleDeleteSprint,
  } = useSprints();

  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState<ISprint | null>(null);

  useEffect(() => {
    handleGetAllSprints();
  }, []);

  const openSprintModal = (sprint?: ISprint) => {
    setSelectedSprint(sprint || null);
    setIsSprintModalOpen(true);
  };

  const closeSprintModal = () => {
    setIsSprintModalOpen(false);
    setSelectedSprint(null);
  };

  const handleSaveSprint = (sprint: ISprint) => {
    if (sprint.id) {
      handleUpdateSprint(sprint); // Si tiene id, actualizar
    } else {
      handleCreateSprint(sprint); // Si no tiene id, crear
    }
  };

  return (
    <div className={styles.containerSidebar}>
      <div className={styles.containerListSidebar}>
        <p
          onClick={() => {
            navigate("/");
          }}
          className={`${
            location.pathname === "/" ? styles.itemSidebarActive : ""
          } ${styles.itemsSidebar}`}
        >
          Backlog
          <IconBook stroke={2} />
        </p>
      </div>
      <div className={styles.containerSprints}>
        <div className={styles.sidebarTitle}>
          <h2>Lista de Sprints</h2>
          <hr className={styles.titleDivider} />
        </div>
        <div className={styles.containerListSprints}>
          {sprints.map((sprint) => (
            <CardSprint
              handleDeleteSprint={handleDeleteSprint}
              openSprintModal={openSprintModal}
              sprint={sprint}
              key={sprint.id}
            />
          ))}
        </div>
      </div>
      <ModalSprint
        isOpen={isSprintModalOpen}
        onClose={closeSprintModal}
        initialData={selectedSprint}
        onSave={handleSaveSprint}
        onDelete={handleDeleteSprint}
      />
    </div>
  );
};
