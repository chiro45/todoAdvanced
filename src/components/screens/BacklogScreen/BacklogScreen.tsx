import { useEffect, useState } from "react";
import { useTodoBacklog } from "../../../hooks/useTodoBacklog";
import { ITarea } from "../../../types/ITodos";
import TareaModal from "../../ui/modals/ModalTareas/ModalTarea";
import { CardTareasBacklog } from "../../ui/cards/CardTareasBacklog/CardTareasBacklog";
import styles from "./BacklogScreen.module.css";
import { Button } from "../../ui/Button/Button";
import { IconPlaylistAdd } from "@tabler/icons-react";
import { useSprints } from "../../../hooks/useSprints";
import { ModalInfo } from "../../ui/modals/ModalInfo/ModalInfo";
import { todoStore } from "../../../store/todoStore";
import { useShallow } from "zustand/shallow";

const fields: any = [
  { label: "Título", key: "titulo" },
  { label: "Descripción", key: "descripcion" },
  { label: "Estado", key: "estado" },
  { label: "Fecha Límite", key: "fechaLimite" },
];
export const BacklogScreen = () => {
  const {
    handleGetTodosBacklog,
    todos,
    sendToSprintById,
    handleCreateTodo,
    handleDeleteTodo,
    handleUpdateTodoBacklog,
  } = useTodoBacklog();

  const { handleGetAllSprints, sprints } = useSprints();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setTodoActive, todoActive } = todoStore(
    useShallow((state) => ({
      todoActive: state.todoActive,
      setTodoActive: state.setTodoActive,
    }))
  );

  useEffect(() => {
    handleGetAllSprints();
    handleGetTodosBacklog();
  }, []);

  const openModal = (tarea?: ITarea) => {
    setTodoActive(tarea || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTodoActive(null);
  };
  const [openModalView, setOpenModalView] = useState(false);

  const openView = (tarea: ITarea) => {
    setTodoActive(tarea);
    setOpenModalView(true);
  };
  const closeView = () => {
    setTodoActive(null);
    setOpenModalView(false);
  };

  return (
    <div className={styles.containerBacklogScreen}>
      <h1>Backlog</h1>
      <div className={styles.containerTitleAndButton}>
        <h2>Tareas en el backlog</h2>
        <Button type="info" handleonClick={() => openModal()}>
          Crear tarea <IconPlaylistAdd />
        </Button>
      </div>
      <div className={styles.containerListTareas}>
        {todos.map((el) => (
          <CardTareasBacklog
            key={el.id}
            sprints={sprints}
            tarea={el}
            openView={openView}
            openModal={openModal}
            sendToSprintById={sendToSprintById}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </div>
      {openModalView && todoActive && (
        <ModalInfo<ITarea>
          title={"Detalle Tarea"}
          fields={fields}
          handleCloseModal={closeView}
          data={todoActive}
        />
      )}
      <TareaModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isBacklog={true}
        createTareaBacklog={handleCreateTodo}
        updateTareaByIdBacklog={handleUpdateTodoBacklog}
      />
    </div>
  );
};
