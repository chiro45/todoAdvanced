import { useEffect, useState } from "react";
import { ISprint, ITarea } from "../../../types/ITodos";
import TareaModal from "../../ui/modals/ModalTareas/ModalTarea";
import { getAllSprints } from "../../../http/sprints";
import styles from "./SprintScreen.module.css";
import { Button } from "../../ui/Button/Button";
import { IconPlaylistAdd } from "@tabler/icons-react";
import { useTodoSprint } from "../../../hooks/useTodoSprint";
import { useParams } from "react-router-dom";
import { CardTareasSprint } from "../../ui/cards/CardsTareasSprint/CardTareasSprint";
import { useSprintStore } from "../../../store/sprintStore";
import { ModalInfo } from "../../ui/modals/ModalInfo/ModalInfo";

const fields: any = [
  { label: "Título", key: "titulo" },
  { label: "Descripción", key: "descripcion" },
  { label: "Estado", key: "estado" },
  { label: "Fecha Límite", key: "fechaLimite" },
];

export const SprintScreen = () => {
  const { idSprint } = useParams<{
    idSprint: string;
  }>();

  const {
    handleDeleteTodo,
    handleUpdateTodoBySprintId,
    handleCreateTodoBySprintId,
    handleGetTodosBySprintId,
    sendToBacklog,
    todos,
  } = useTodoSprint({ idSprint: idSprint! });

  const handleGetSprints = async () => {
    const data = await getAllSprints();
    setSprints(data);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);

  const sprintName = useSprintStore((state) => state.sprintName);

  const [sprints, setSprints] = useState<ISprint[]>([]);

  useEffect(() => {
    handleGetSprints();
    handleGetTodosBySprintId();
  }, [idSprint]);

  const openModal = (tarea?: ITarea) => {
    setSelectedTarea(tarea || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTarea(null);
  };

  const openView = (tarea: ITarea) => {
    setSelectedTarea(tarea);
    setOpenModalView(true);
  };
  const closeView = () => {
    setSelectedTarea(null);
    setOpenModalView(false);
  };

  return (
    <div className={styles.containerBacklogScreen}>
      <h1>Nombre de la sprint: {sprintName}</h1>
      <div className={styles.containerTitleAndButton}>
        <h2>Tareas en la sprint</h2>
        <Button
          stylesCustom={{ marginTop: "-1rem" }}
          type="info"
          handleonClick={() => openModal()}
        >
          Crear tarea <IconPlaylistAdd />
        </Button>
      </div>
      <div className={styles.containerListTareas}>
        <div className={styles.column}>
          <h3>Pendiente</h3>
          <div className={styles.taskList}>
            {todos
              .filter((el) => el.estado === "pendiente")
              .map((el) => (
                <CardTareasSprint
                  key={el.id}
                  sprints={sprints}
                  tarea={el}
                  openView={openView}
                  openModal={openModal}
                  sendToBacklog={sendToBacklog}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))}
          </div>
        </div>

        <div className={styles.column}>
          <h3>En Progreso</h3>
          <div className={styles.taskList}>
            {todos
              .filter((el) => el.estado === "en_progreso")
              .map((el) => (
                <CardTareasSprint
                  key={el.id}
                  sprints={sprints}
                  tarea={el}
                  openView={openView}
                  openModal={openModal}
                  sendToBacklog={sendToBacklog}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))}
          </div>
        </div>

        <div className={styles.column}>
          <h3>Completado</h3>
          <div className={styles.taskList}>
            {todos
              .filter((el) => el.estado === "completado")
              .map((el) => (
                <CardTareasSprint
                  key={el.id}
                  sprints={sprints}
                  tarea={el}
                  openModal={openModal}
                  openView={openView}
                  sendToBacklog={sendToBacklog}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))}
          </div>
        </div>
      </div>

      {openModalView && selectedTarea && (
        <ModalInfo<ITarea>
          title={"Detalle Tarea"}
          fields={fields}
          handleCloseModal={closeView}
          data={selectedTarea}
        />
      )}

      <TareaModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={selectedTarea}
        isBacklog={true}
        handleCreateTodoBySprintId={handleCreateTodoBySprintId}
        handleUpdateTodoBySprintId={handleUpdateTodoBySprintId}
      />
    </div>
  );
};
