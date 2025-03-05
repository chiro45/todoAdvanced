import React, { useState, useEffect } from "react";
import { ISprint } from "../../../../types/ITodos";
import styles from "./ModalSprint.module.css";
import { ModalBase } from "../ModalBase/ModalBase";
import { InputField } from "../../Input/Input";
import { Button } from "../../Button/Button";
import { useSprintStore } from "../../../../store/sprintStore";
interface SprintModalProps {
  onClose: () => void;
  onSave: (sprint: ISprint) => void;
}

const initialData: ISprint = {
  id: "",
  fechaInicio: "",
  fechaCierre: "",
  nombre: "",
  tareas: [],
};

export const ModalSprint: React.FC<SprintModalProps> = ({
  onClose,
  onSave,
}) => {
  const sprintActive = useSprintStore((state) => state.sprintActive);

  const [sprint, setSprint] = useState<ISprint>(initialData);

  useEffect(() => {
    console.log("hola", sprintActive);
    if (sprintActive) {
      console.log("hola1", sprintActive);

      setSprint(sprintActive);
    } else {
      console.log("hola2", sprintActive);

      setSprint(initialData);
    }
  }, [sprintActive]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSprint({ ...sprint, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!sprint.fechaInicio || !sprint.fechaCierre) return;
    onSave(sprint);
    onClose();
  };


  return (
    <ModalBase>
      <div className={styles.modal}>
        <h2>{sprintActive !== null ? "Editar Sprint" : "Crear Sprint"}</h2>
        <InputField
          type={"text"}
          name={"nombre"}
          placeholder={"Inserte un nombre"}
          value={sprint.nombre}
          handleChange={handleChange}
          className={styles.input}
        />
        <InputField
          type={"date"}
          name={"fechaInicio"}
          value={sprint.fechaInicio}
          handleChange={handleChange}
          className={styles.input}
        />
        <InputField
          type={"date"}
          name={"fechaCierre"}
          value={sprint.fechaCierre}
          handleChange={handleChange}
          className={styles.input}
        />

        <div className={styles.actions}>
          <Button type="error" handleonClick={onClose}>
            Cancelar
          </Button>

          <Button type="info" handleonClick={handleSubmit}>
            {sprintActive ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};
