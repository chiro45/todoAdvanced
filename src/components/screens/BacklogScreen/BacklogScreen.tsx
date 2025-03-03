import { useEffect, useState } from "react";
import { useTodoBacklog } from "../../../hooks/useTodoBacklog";
import { ITarea } from "../../../types/ITodos";
import TareaModal from "../../ui/modals/ModalTareas/ModalTarea";

export const BacklogScreen = () => {
  const {
    handleGetTodosBacklog,
    todos,
    sendToSprintById,
    handleCreateTodo,
    handleDeleteTodo,
    handleUpdateTodoBacklog,
  } = useTodoBacklog();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);

  useEffect(() => {
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
    <div>
      <h1>Backlog</h1>
      <button onClick={() => openModal()}>Crear Tarea</button>
      <div>
        {todos.map((el) => (
          <div key={el.id}>
            <p>{el.descripcion}</p>
            <button onClick={() => openModal(el)}>Editar</button>
            <button onClick={() => handleDeleteTodo(el.id!)}>Eliminar</button>
            <button onClick={() => sendToSprintById(el.id!, '1')}>
              send to sprint 1
            </button>
          </div>
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
