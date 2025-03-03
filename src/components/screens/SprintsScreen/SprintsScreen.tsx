import { useEffect, useState } from "react";
import { useSprints } from "../../../hooks/useSprints";
import { ISprint } from "../../../types/ITodos";
import { ModalSprint } from "../../ui/modals/ModalSprint/ModalSprint";
import { CardSprint } from "../../ui/cards/CardSprint/CardSprint";
import styles from "./SprintsScreen.module.css";
import { Button } from "../../ui/Button/Button";
export const SprintsScreen = () => {
  const {
    sprints,
    handleGetAllSprints,
    handleCreateSprint,
    handleUpdateSprint,
    handleDeleteSprint,
    loading,
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
    <div className={styles.containerSprintsScreen}>
      <div className={styles.containerTitleAndButton}>
        <h2>Sprints</h2>
        <Button type="info" onClick={() => openSprintModal()}>
          Crear Sprint
        </Button>
      </div>
      <div className={styles.containerSprints}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          sprints.map((sprint) => (
            <CardSprint
              handleDeleteSprint={handleDeleteSprint}
              openSprintModal={openSprintModal}
              sprint={sprint}
              key={sprint.id}
            />
          ))
        )}
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
