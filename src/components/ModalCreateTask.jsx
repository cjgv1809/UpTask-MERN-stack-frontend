/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const PRIORITY = ["Baja", "Media", "Alta"];

function ModalCreateTask({
  id,
  handleAccept,
  title,
  text,
  firstBtnText,
  secondBtnText,
}) {
  const [idToEdit, setIdToEdit] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const { id: projectId } = useParams();
  const { handleModalClose, showAlert, submitTask, task, alert } =
    useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      deliveryDate.trim() === "" ||
      priority.trim() === ""
    ) {
      showAlert("Error", "Todos los campos son obligatorios", true);
      return;
    }

    // Send data to backend
    await submitTask({
      idToEdit,
      name,
      description,
      deliveryDate,
      priority,
      project: projectId,
    });

    // Reset form
    resetForm();
    // Close modal
    handleModalClose(id);
  };

  const resetForm = () => {
    setIdToEdit("");
    setName("");
    setDescription("");
    setDeliveryDate("");
    setPriority("");
  };

  useEffect(() => {
    if (task?._id && id === "edit-task-modal") {
      setIdToEdit(task._id);
      setName(task.name);
      setDescription(task.description);
      setDeliveryDate(task.deliveryDate?.split("T")[0]);
      setPriority(task.priority);
      return;
    }
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  const handleCancel = (id) => {
    if (id === "edit-task-modal") {
      handleModalClose(id);
    } else {
      handleModalClose(id);
      resetForm();
    }
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        {title && <h3 className="text-lg font-bold text-left">{title}</h3>}
        {text && <p className="py-4 text-left">{text}</p>}
        <div className="modal-action">
          <form onSubmit={handleSubmit} className="w-full">
            {alert.title && alert.message && alert.error && (
              <Alert
                title={alert.title}
                message={alert.message}
                error={alert.error}
              />
            )}
            <div className="mb-2 form-control">
              <label className="label" htmlFor="task-name">
                <span className="label-text">Nombre</span>
              </label>
              <input
                id="task-name"
                type="text"
                placeholder="Ingresa nombre"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-cy="task-name"
              />
            </div>

            <div className="mb-2 form-control">
              <label className="label" htmlFor="task-description">
                <span className="label-text">Descripción</span>
              </label>
              <input
                id="task-description"
                type="text"
                placeholder="Ingresa descripción"
                className="input input-bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-cy="task-description"
              />
            </div>

            <div className="mb-2 form-control">
              <label className="label" htmlFor="date">
                <span className="label-text">Fecha de entrega</span>
              </label>
              <input
                id="date"
                className="input input-bordered"
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                data-cy="task-delivery-date"
              />
            </div>

            <div className="mb-2 form-control">
              <label className="label" htmlFor="task-priority">
                <span className="label-text">Prioridad</span>
              </label>
              <select
                className="select select-bordered"
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                data-cy="task-priority"
              >
                <option value="" disabled>
                  Elige una opción
                </option>
                {PRIORITY.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 mt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="flex-1 btn sm:flex-none"
                onClick={() => handleCancel(id)}
              >
                {firstBtnText}
              </button>
              <button
                type="submit"
                className="flex-1 btn btn-primary sm:flex-none"
                onClick={handleAccept}
                data-cy="submit-task"
              >
                {secondBtnText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ModalCreateTask;
