import { useLocation, useNavigate } from "react-router-dom";
import { IconBook, IconPlaylistAdd } from "@tabler/icons-react";
import styles from "./Sidebar.module.css";
import { useSprints } from "../../../hooks/useSprints";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ITodos";
import { CardSprint } from "../cards/CardSprint/CardSprint";
import { ModalSprint } from "../modals/ModalSprint/ModalSprint";
import { Button } from "../Button/Button";
import { ModalInfo } from "../modals/ModalInfo/ModalInfo";
import { useSprintStore } from "../../../store/sprintStore";
import { useShallow } from "zustand/shallow";

const fields: any = [
  { label: "Nombre", key: "nombre" },
  { label: "Fecha inicio", key: "fechaInicio" },
  { label: "Fecha limite", key: "fechaCierre" },
];
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
  const [openModalView, setOpenModalView] = useState(false);
  const { sprintActive, setSprintActive } = useSprintStore(
    useShallow((state) => ({
      sprintActive: state.sprintActive,
      setSprintActive: state.setSprintActive,
    }))
  );

  useEffect(() => {
    handleGetAllSprints();
  }, []);

  const openSprintModal = (sprint?: ISprint) => {
    setSprintActive(sprint || null);
    setIsSprintModalOpen(true);
  };

  const closeSprintModal = () => {
    setIsSprintModalOpen(false);
    setSprintActive(null);
  };

  const handleSaveSprint = (sprint: ISprint) => {
    if (sprint.id) {
      handleUpdateSprint(sprint); // Si tiene id, actualizar
    } else {
      handleCreateSprint(sprint); // Si no tiene id, crear
    }
    setSprintActive(null);
  };

  const openView = (sprint: ISprint) => {
    setSprintActive(sprint);
    setOpenModalView(true);
  };
  const closeView = () => {
    setSprintActive(null);
    setOpenModalView(false);
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <h2>Lista de Sprints</h2>
            <Button type="info" handleonClick={() => openSprintModal()}>
              <IconPlaylistAdd />
            </Button>
          </div>
          <hr className={styles.titleDivider} />
        </div>

        <div className={styles.containerListSprints}>
          {sprints.map((sprint) => (
            <CardSprint
              handleDeleteSprint={handleDeleteSprint}
              openSprintModal={openSprintModal}
              openView={openView}
              sprint={sprint}
              key={sprint.id}
            />
          ))}
        </div>
      </div>
      {openModalView && sprintActive && (
        <ModalInfo<ISprint>
          title={"Detalle Sprint"}
          fields={fields}
          handleCloseModal={closeView}
          data={sprintActive}
        />
      )}
      {isSprintModalOpen && (
        <ModalSprint onClose={closeSprintModal} onSave={handleSaveSprint} />
      )}
    </div>
  );
};
