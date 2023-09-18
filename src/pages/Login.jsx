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
      <h1 className="text-center text-4xl font-bold font-heading leading-9 tracking-wide text-gray-400">
        Inicia sesión y administra tus{" "}
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
        <div>
          <label htmlFor="password" className="label font-semibold">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            className="input input-bordered w-full max-w-xs focus:outline-accent-focus"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          <span>Iniciar sesión</span>
        </button>
      </form>

      <div className="text-center">
        <Link
          to="/forgot-password"
          className="text-accent text-sm font-semibold hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>

        <div className="mt-4">
          <span className="text-gray-400">¿No tienes una cuenta?</span>
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

export default Login;
