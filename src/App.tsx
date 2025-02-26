import { useEffect } from "react";
import { useTodos } from "./hooks/useTodos";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTodoStore } from "./store/counterZuztand";

const App = () => {
  const {
    handleDeleteTodo,
    handleUpdateTodo,
    handleCreateTodo,
    handleGetTodos,
    loading,
    todos,
  } = useTodos();

  useEffect(() => {
    handleGetTodos();
  }, []);
  const setTodos = useTodoStore((state) => state.setTodos);
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return; // Si no se suelta en una zona válida

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return; // Si el item no se movió
    }

    // Clonar el array actual de todos
    const updatedTodos = [...todos];

    // Encontrar el índice del todo en el array global
    const todoIndex = updatedTodos.findIndex(
      (el) => el.id!.toString() === draggableId
    );
    if (todoIndex === -1) return;

    // Extraer el elemento a mover
    const [movedTodo] = updatedTodos.splice(todoIndex, 1);

    // Filtrar los todos en la columna de origen y actualizar su orden
    const sourceColumnTodos = updatedTodos
      .filter((todo) => todo.estado === source.droppableId)
      .sort((a, b) => a.orden - b.orden)
      .map((todo, index) => ({ ...todo, orden: index }));

    // Filtrar los todos en la columna de destino y preparar su nuevo orden
    const destinationColumnTodos = updatedTodos
      .filter((todo) => todo.estado === destination.droppableId)
      .sort((a, b) => a.orden - b.orden);

    // Insertar la tarea en la nueva posición dentro de la columna destino
    destinationColumnTodos.splice(destination.index, 0, {
      ...movedTodo,
      estado: destination.droppableId,
    });

    // Reasignar los índices de la columna de destino
    const updatedDestinationColumnTodos = destinationColumnTodos.map(
      (todo, index) => ({
        ...todo,
        orden: index,
      })
    );

    // Combinar los cambios en el array global
    const finalTodos = [
      ...updatedTodos.filter(
        (todo) =>
          todo.estado !== destination.droppableId &&
          todo.estado !== source.droppableId
      ),
      ...sourceColumnTodos,
      ...updatedDestinationColumnTodos,
    ];

    // Actualizar el estado global
    handleUpdateTodo(movedTodo, {
      estado: movedTodo.estado,
      orden: movedTodo.orden,
    });

    setTodos(finalTodos);
  };

  return (
    <div>
      <button
        onClick={() => {
          handleCreateTodo();
        }}
      >
        Add new Todo
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "50vh",
          }}
        >
          {/* Lista de To Do */}
          <Droppable droppableId="pendiente">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width: "30%",
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                }}
              >
                <h3>To Do</h3>
                {todos.map((todo, index) => (
                  <>
                    {todo.estado === "pendiente" && (
                      <Draggable
                        key={todo.id}
                        draggableId={todo!.id!.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              border: "1px solid #ccc",
                              padding: "10px",
                              marginBottom: "10px",
                              backgroundColor: "#fff",
                            }}
                          >
                            <p>{todo.titulo}</p>
                            <p>{todo.descripcion}</p>
                            <button onClick={() => handleDeleteTodo(todo.id!)}>
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    )}
                  </>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Lista de In Progress */}
          <Droppable droppableId="en_progreso">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width: "30%",
                  backgroundColor: "#e0e0e0",
                  padding: "10px",
                }}
              >
                <h3>In Progress</h3>
                {todos.map((todo, index) => (
                  <>
                    {todo.estado === "en_progreso" && (
                      <Draggable
                        key={todo.id}
                        draggableId={todo!.id!.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              border: "1px solid #ccc",
                              padding: "10px",
                              marginBottom: "10px",
                              backgroundColor: "#fff",
                            }}
                          >
                            <p>{todo.titulo}</p>
                            <p>{todo.descripcion}</p>
                            <button onClick={() => handleDeleteTodo(todo.id!)}>
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    )}
                  </>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Lista de Done */}
          <Droppable droppableId="completado">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width: "30%",
                  backgroundColor: "#d0ffd0",
                  padding: "10px",
                }}
              >
                <h3>Done</h3>
                {todos.map((todo, index) => (
                  <>
                    {todo.estado === "completado" && (
                      <Draggable
                        key={todo.id}
                        draggableId={todo!.id!.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              border: "1px solid #ccc",
                              padding: "10px",
                              marginBottom: "10px",
                              backgroundColor: "#fff",
                            }}
                          >
                            <p>{todo.titulo}</p>
                            <p>{todo.descripcion}</p>
                            <button onClick={() => handleDeleteTodo(todo.id!)}>
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    )}
                  </>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
