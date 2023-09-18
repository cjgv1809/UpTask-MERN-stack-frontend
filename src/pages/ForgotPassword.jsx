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
      <h1 className="text-center text-4xl font-bold font-heading leading-9 tracking-wide text-gray-400">
        Recupera tu acceso y no pierdas tus{" "}
        <span className="text-accent">proyectos</span>
      </h1>

      <form
        className="my-10 space-y-4 form-control w-full max-w-xs mx-auto"
        onSubmit={handleSubmit}
      >
        {alert.title && alert.message && (
          <Alert
            title={alert.title}
            message={alert.message}
            error={alert.error}
          />
        )}
        <div>
          <label htmlFor="email" className="label font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu email"
            className="input input-bordered w-full max-w-xs focus:outline-accent-focus"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          <span>Recuperar cuenta</span>
        </button>
      </form>

      <div className="text-center">
        <span className="text-gray-400">Ya tienes una cuenta?</span>
        <Link
          to="/"
          className="text-accent text-sm font-semibold hover:underline"
        >
          {" "}
          Inicia sesión
        </Link>
        <div className="mt-4">
          <span className="text-gray-400">No tienes una cuenta?</span>
          <Link
            to="/register"
            className="text-accent text-sm font-semibold hover:underline"
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
