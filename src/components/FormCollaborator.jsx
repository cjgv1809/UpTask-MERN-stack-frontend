import { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

function FormCollaborator() {
  const [email, setEmail] = useState("");
  const { showAlert, alert, submitCollaborator, setCollaborator } =
    useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (email.trim() === "") {
      showAlert("Error", "Email es un campo obligatorio", true);
      return;
    }

    // Send data to backend
    submitCollaborator(email);

    // Reset form
    setEmail("");
    setCollaborator({});
  };

  return (
    <form
      className="max-w-sm mx-auto my-5"
      onSubmit={handleSubmit}
      data-cy="submit-collaborator"
    >
      {alert.title && alert.message && (
        <Alert
          title={alert.title}
          message={alert.message}
          error={alert.error}
        />
      )}

      <div className="mb-2 form-control">
        <label className="label" htmlFor="email">
          <span className="label-text">Email Colaborador</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Ingresa email del colaborador"
          className="input input-bordered"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-cy="search-email-collaborator-input"
        />
      </div>

      <button
        type="submit"
        className="mt-5 btn btn-primary btn-block"
        data-cy="search-collaborator-button"
      >
        <span>Buscar colaborador</span>
      </button>
    </form>
  );
}

export default FormCollaborator;
