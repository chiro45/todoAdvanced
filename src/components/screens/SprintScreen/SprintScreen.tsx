import { useEffect, useState } from "react";
import { useTodoSprint } from "../../../hooks/useTodoSprint";
import { ITarea } from "../../../types/ITodos";
import TareaModal from "../../ui/modals/ModalTareas/ModalTarea";
import { useParams } from "react-router-dom";

export const SprintScreen = () => {
  const { idSprint } = useParams<{ idSprint: string }>();

  const {
    handleGetTodosBySprintId,
    todos,
    handleCreateTodoBySprintId,
    handleDeleteTodo,
    handleUpdateTodoBySprintId,
    sendToBacklog,
  } = useTodoSprint({ idSprint: idSprint! });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);

  useEffect(() => {
    handleGetTodosBySprintId();
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
    <div>
      <h1>Sprint</h1>
      <button onClick={() => openModal()}>Crear Tarea</button>
      <div>
        {todos.map((el) => (
          <div key={el.id}>
            <p>{el.descripcion}</p>
            <button onClick={() => openModal(el)}>Editar</button>
            <button onClick={() => handleDeleteTodo(el.id!)}>Eliminar</button>
            <button onClick={() => sendToBacklog(el.id!)}>
              send To backlog
            </button>
          </div>
        ))}
      </div>
      <TareaModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={selectedTarea}
        isBacklog={false}
        handleCreateTodoBySprintId={handleCreateTodoBySprintId}
        handleUpdateTodoBySprintId={handleUpdateTodoBySprintId}
      />
    </div>
  );
};
