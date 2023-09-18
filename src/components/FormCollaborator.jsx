import { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

function FormCollaborator() {
  const [email, setEmail] = useState("");
  const { showAlert, alert, submitCollaborator, setCollaborator } = useProjects();

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
    <form className="my-5 max-w-sm mx-auto" onSubmit={handleSubmit}>
      {alert.title && alert.message && (
        <Alert
          title={alert.title}
          message={alert.message}
          error={alert.error}
        />
      )}

      <div className="form-control mb-2">
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
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block mt-5">
        <span>Buscar colaborador</span>
      </button>
    </form>
  );
}

export default FormCollaborator;
