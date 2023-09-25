import { useEffect, useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";
import { useParams } from "react-router-dom";

function FormProject() {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [client, setClient] = useState("");
  const { showAlert, alert, submitProject, project } = useProjects();
  const { id: urlId } = useParams();

  useEffect(() => {
    if (urlId && project.name) {
      setId(project._id);
      setName(project.name);
      setDescription(project.description);
      setDeliveryDate(project.deliveryDate?.split("T")[0]);
      setClient(project.client);
    }
  }, [urlId, project]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      deliveryDate.trim() === "" ||
      client.trim() === ""
    ) {
      showAlert("Error", "Todos los campos son obligatorios", true);
      return;
    }

    // Send data to backend
    await submitProject({
      id,
      name,
      description,
      deliveryDate,
      client,
    });

    // Reset form
    setId(null);
    setName("");
    setDescription("");
    setDeliveryDate("");
    setClient("");
  };

  return (
    <form
      className="max-w-sm mx-auto mt-5"
      onSubmit={handleSubmit}
      data-cy="submit-project"
    >
      {alert.title && alert.message && (
        <Alert
          title={alert.title}
          message={alert.message}
          error={alert.error}
        />
      )}
      <div className="mb-2 form-control">
        <label className="label" htmlFor="project-name">
          <span className="label-text">Nombre del proyecto</span>
        </label>
        <input
          id="project-name"
          type="text"
          placeholder="Ingresa nombre del proyecto"
          className="input input-bordered"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-cy="project-name"
        />
      </div>

      <div className="mb-2 form-control">
        <label className="label" htmlFor="description">
          <span className="label-text">Descripción</span>
        </label>
        <textarea
          id="description"
          placeholder="Ingresa descripción del proyecto"
          className="h-24 resize-none textarea textarea-bordered"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-cy="project-description"
        ></textarea>
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
          data-cy="project-delivery-date"
        />
      </div>

      <div className="mb-2 form-control">
        <label className="label" htmlFor="client-name">
          <span className="label-text">Nombre del cliente</span>
        </label>
        <input
          id="client-name"
          className="input input-bordered"
          type="text"
          placeholder="Ingresa nombre del cliente"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          data-cy="project-client"
        />
      </div>

      <button
        type="submit"
        className="mt-5 btn btn-primary btn-block"
        data-cy="project-button"
      >
        <span>{id ? "Actualizar proyecto" : "Crear proyecto"}</span>
      </button>
    </form>
  );
}

export default FormProject;
