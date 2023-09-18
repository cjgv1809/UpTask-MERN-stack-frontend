import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

function ConfirmAccount() {
  const { id } = useParams();
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    error: false,
  });
  const [confirmAccountData, setConfirmAccountData] = useState(false);

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await axiosClient.get(
          // eslint-disable-next-line no-undef
          `/users/confirmation/${id}`
        );
        console.log(data);
        setAlert({
          title: "Cuenta confirmada",
          message: data.message,
          error: false,
        });
        setConfirmAccountData(true);
      } catch (error) {
        console.log(error.response);
        setAlert({
          title: "Error",
          message: error.response.data.message,
          error: true,
        });
        setConfirmAccountData(false);
      }
    };
    confirmAccount();
  }, [id]);

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-center text-4xl font-bold font-heading leading-9 tracking-wide text-gray-400">
        Confirma tu cuenta y comienza a crear tus{" "}
        <span className="text-accent">proyectos</span>
      </h1>

      {alert.title && alert.message && (
        <Alert
          title={alert.title}
          message={alert.message}
          error={alert.error}
        />
      )}

      {confirmAccountData && (
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-accent text-sm font-semibold hover:underline"
          >
            Inicia sesión
          </Link>
        </div>
      )}
    </div>
  );
}

export default ConfirmAccount;
