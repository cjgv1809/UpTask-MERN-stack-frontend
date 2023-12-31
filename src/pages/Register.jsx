import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    error: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate form
    if (
      [
        registerData.name,
        registerData.email,
        registerData.password,
        registerData.repeatPassword,
      ].includes("")
    ) {
      console.log("All fields are required");
      setAlert({
        title: "Error",
        message: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // validate password
    if (registerData.password !== registerData.repeatPassword) {
      console.log("Passwords don't match");
      setAlert({
        title: "Error",
        message: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }

    // validate password length
    if (registerData.password.length < 6) {
      console.log("Password too short");
      setAlert({
        title: "Error",
        message: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    // reset error state
    setAlert({
      title: "",
      message: "",
      error: false,
    });

    // send data to backend
    try {
      const { data } = await axiosClient.post(
        // eslint-disable-next-line no-undef
        `/users`,
        {
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        }
      );
      setAlert({
        title: "Cuenta creada exitosamente",
        message: data.message,
        error: false,
      });
      setRegisterData({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      });
    } catch (error) {
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
        Crea tu cuenta y administra tus{" "}
        <span className="text-accent">proyectos</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs mx-auto my-10 space-y-4 form-control"
        data-cy="register-form"
      >
        {alert.title && alert.message && (
          <Alert
            title={alert.title}
            message={alert.message}
            error={alert.error}
          />
        )}
        <div>
          <label
            htmlFor="name"
            className="label font-semibold justify-start after:content-['(Requerido)'] after:text-gray-400 after:ml-1"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Ingresa tu nombre"
            className="w-full max-w-xs input input-bordered focus:outline-accent-focus"
            value={registerData.name}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                name: e.target.value,
              })
            }
            data-cy="name-input"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="label font-semibold justify-start after:content-['(Requerido)'] after:text-gray-400 after:ml-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Ingresa tu email"
            className="w-full max-w-xs input input-bordered focus:outline-accent-focus"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                email: e.target.value,
              })
            }
            data-cy="email-input"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="label font-semibold justify-start after:content-['(Requerido)'] after:text-gray-400 after:ml-1"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            className="w-full max-w-xs input input-bordered focus:outline-accent-focus"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                password: e.target.value,
              })
            }
            data-cy="password-input"
          />
          <span className="text-gray-400 label-text-alt">
            La contraseña debe tener al menos 6 caracteres
          </span>
        </div>
        <div>
          <label
            htmlFor="repeat-password"
            className="label font-semibold justify-start after:content-['(Requerido)'] after:text-gray-400 after:ml-1"
          >
            Repetir Contraseña
          </label>
          <input
            id="repeat-password"
            type="password"
            name="repeat-password"
            placeholder="Ingresa tu contraseña"
            className="w-full max-w-xs input input-bordered focus:outline-accent-focus"
            value={registerData.repeatPassword}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                repeatPassword: e.target.value,
              })
            }
            data-cy="repeat-password-input"
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          type="submit"
          data-cy="submit-register"
        >
          <span>Crear cuenta</span>
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
          <span className="text-gray-400">¿Ya tienes una cuenta?</span>
          <Link
            to="/"
            className="text-sm font-semibold text-accent hover:underline"
            data-cy="login-link"
          >
            {" "}
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
