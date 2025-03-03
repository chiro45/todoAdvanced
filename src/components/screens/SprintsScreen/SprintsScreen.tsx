import { useEffect, useState } from "react";
import { useSprints } from "../../../hooks/useSprints";
import { ISprint } from "../../../types/ITodos";
import { ModalSprint } from "../../ui/modals/ModalSprint/ModalSprint";

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
    <div>
      <h1>Sprints</h1>
      <button onClick={() => openSprintModal()}>Crear Sprint</button>
      <div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          sprints.map((sprint) => (
            <div key={sprint.id}>
              <p>
                {sprint.fechaInicio} - {sprint.fechaCierre}
              </p>
              <button onClick={() => openSprintModal(sprint)}>Editar</button>
              <button onClick={() => handleDeleteSprint(sprint.id)}>
                Eliminar
              </button>
            </div>
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
