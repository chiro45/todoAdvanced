import { useEffect, useState } from "react";
import { useTodoBacklog } from "../../../hooks/useTodoBacklog";
import { ISprint, ITarea } from "../../../types/ITodos";
import TareaModal from "../../ui/modals/ModalTareas/ModalTarea";
import { CardTareasBacklog } from "../../ui/cards/CardTareasBacklog/CardTareasBacklog";
import { getAllSprints } from "../../../http/sprints";
import styles from "./BacklogScreen.module.css";
import { Button } from "../../ui/Button/Button";
export const BacklogScreen = () => {
  const {
    handleGetTodosBacklog,
    todos,
    sendToSprintById,
    handleCreateTodo,
    handleDeleteTodo,
    handleUpdateTodoBacklog,
  } = useTodoBacklog();

  const handleGetSprints = async () => {
    const data = await getAllSprints();
    setSprints(data);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);

  const [sprints, setSprints] = useState<ISprint[]>([]);

  useEffect(() => {
    handleGetSprints();
    handleGetTodosBacklog();
  }, []);

  const openModal = (tarea?: ITarea) => {
    setSelectedTarea(tarea || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTarea(null);
  };

  return (
    <div className={styles.containerBacklogScreen}>
      <h1>Backlog</h1>
      <div  className={styles.containerTitleAndButton}>
        <h2>Tareas en el backlog</h2>
        <Button type="info" onClick={() => openModal()}>
          Crear Tarea
        </Button>
      </div>
      <div className={styles.containerListTareas}>
        {todos.map((el) => (
          <CardTareasBacklog
            key={el.id}
            sprints={sprints}
            tarea={el}
            openModal={openModal}
            sendToSprintById={sendToSprintById}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </div>
      <TareaModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={selectedTarea}
        isBacklog={true}
        createTareaBacklog={handleCreateTodo}
        updateTareaByIdBacklog={handleUpdateTodoBacklog}
      />
    </div>
  );
};
