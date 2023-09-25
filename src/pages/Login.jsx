import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";

function Login() {
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    error: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (email.trim() === "" || password.trim() === "") {
      setAlert({
        title: "Error",
        message: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Send data to backend
    try {
      const { data } = await axiosClient.post("/users/login", {
        email,
        password,
      });
      console.log(data);
      setAlert({
        title: "Inicio de sesion exitoso",
        message: data.message,
        error: false,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/projects");
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
        Inicia sesión y administra tus{" "}
        <span className="text-accent">proyectos</span>
      </h1>

      <form
        className="w-full max-w-xs mx-auto my-10 space-y-4 form-control"
        onSubmit={handleSubmit}
        data-cy="login-form"
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
        <div>
          <label htmlFor="password" className="font-semibold label">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            className="w-full max-w-xs input input-bordered focus:outline-accent-focus"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-cy="password-input"
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          type="submit"
          data-cy="submit-login"
        >
          <span>Iniciar sesión</span>
        </button>
      </form>

      <div className="text-center">
        <Link
          to="/forgot-password"
          className="text-sm font-semibold text-accent hover:underline"
          data-cy="forgot-password-link"
        >
          ¿Olvidaste tu contraseña?
        </Link>

        <div className="mt-4">
          <span className="text-gray-400">¿No tienes una cuenta?</span>
          <Link
            to="/register"
            className="text-sm font-semibold text-accent hover:underline"
            data-cy="register-link"
          >
            {" "}
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
