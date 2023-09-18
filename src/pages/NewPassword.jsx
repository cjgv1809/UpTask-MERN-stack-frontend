import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

function NewPassword() {
  const { token } = useParams();
  const [validtoken, setValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    error: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const generateNewPassword = async () => {
      try {
        const { data } = await axiosClient.get(
          // eslint-disable-next-line no-undef
          `/users/forgot-password/${token}`
        );
        console.log(data);
        setValidToken(true);
      } catch (error) {
        console.log(error.response);
        setValidToken(false);
        setAlert({
          title: "Error",
          message: error.response.data.message,
          error: true,
        });
      }
    };
    generateNewPassword();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate form
    if (password === "") {
      console.log("Password is required");
      setAlert({
        title: "Error",
        message: "La contraseña es obligatoria",
        error: true,
      });
      return;
    }

    // validate password length
    if (password.length < 6) {
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
        `/users/forgot-password/${token}`,
        {
          password,
        }
      );
      setAlert({
        title: "Contraseña actualizada",
        message: data.message,
        error: false,
      });
      setPassword("");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setAlert({
        title: "Error",
        message: error.response.data.message,
        error: true,
      });
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-center text-4xl font-bold font-heading leading-9 tracking-wide text-gray-400">
        Restablece tu contraseña y no pierdas acceso a tus{" "}
        <span className="text-accent">proyectos</span>
      </h1>

      {alert.title && alert.message && (
        <Alert
          title={alert.title}
          message={alert.message}
          error={alert.error}
        />
      )}

      {validtoken && (
        <form
          className="my-10 space-y-4 form-control w-full max-w-xs mx-auto"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="password" className="label font-semibold">
              Nuevo Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu nuevo contraseña"
              className="input input-bordered w-full max-w-xs focus:outline-accent-focus"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="label-text-alt text-gray-400">
              La contraseña debe tener al menos 6 caracteres
            </span>
          </div>
          <button className="btn btn-primary btn-block" type="submit">
            <span>Restablecer cuenta</span>
          </button>
        </form>
      )}
    </div>
  );
}

export default NewPassword;
