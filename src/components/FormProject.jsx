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
    <form className="mt-5 max-w-sm mx-auto" onSubmit={handleSubmit}>
      {alert.title && alert.message && (
        <Alert
          title={alert.title}
          message={alert.message}
          error={alert.error}
        />
      )}
      <div className="form-control mb-2">
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
        />
      </div>

      <div className="form-control mb-2">
        <label className="label" htmlFor="description">
          <span className="label-text">Descripción</span>
        </label>
        <textarea
          id="description"
          placeholder="Ingresa descripción del proyecto"
          className="textarea textarea-bordered h-24 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="form-control mb-2">
        <label className="label" htmlFor="date">
          <span className="label-text">Fecha de entrega</span>
        </label>
        <input
          id="date"
          className="input input-bordered"
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
      </div>

      <div className="form-control mb-2">
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
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block mt-5">
        <span>{id ? "Actualizar proyecto" : "Crear proyecto"}</span>
      </button>
    </form>
  );
}

export default FormProject;
