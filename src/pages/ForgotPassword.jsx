import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    error: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate form
    if (email === "") {
      console.log("Email is required");
      setAlert({
        title: "Error",
        message: "El email es obligatorio",
        error: true,
      });
      return;
    }

    // send email to backend
    try {
      const { data } = await axiosClient.post(
        // eslint-disable-next-line no-undef
        `/users/forgot-password`,
        { email }
      );
      console.log(data);
      setAlert({
        title: "Email enviado",
        message: data.message,
        error: false,
      });
    } catch (error) {
      console.log(error.response);
      setAlert({
        title: "Error",
        message: error.response.data.message,
        error: true,
      });
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-4xl font-bold leading-9 tracking-wide text-center text-gray-400 font-heading">
        Recupera tu acceso y no pierdas tus{" "}
        <span className="text-accent">proyectos</span>
      </h1>

      <form
        className="w-full max-w-xs mx-auto my-10 space-y-4 form-control"
        onSubmit={handleSubmit}
        data-cy="forgot-password-form"
      >
        {alert.title && alert.message && (
          <Alert
            title={alert.title}
            message={alert.message}
            error={alert.error}
          />
        )}
        <div>
          <label htmlFor="email" className="font-semibold label">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu email"
            className="w-full max-w-xs input input-bordered focus:outline-accent-focus"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-cy="email-input"
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          type="submit"
          data-cy="submit-forgot-password"
        >
          <span>Recuperar cuenta</span>
        </button>
      </form>

      <div className="text-center">
        <span className="text-gray-400">Ya tienes una cuenta?</span>
        <Link
          to="/"
          className="text-sm font-semibold text-accent hover:underline"
          data-cy="login-link"
        >
          {" "}
          Inicia sesión
        </Link>
        <div className="mt-4">
          <span className="text-gray-400">No tienes una cuenta?</span>
          <Link
            to="/register"
            className="text-sm font-semibold text-accent hover:underline"
          >
            {" "}
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
