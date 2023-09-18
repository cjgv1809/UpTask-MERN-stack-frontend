import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormCollaborator from "../components/FormCollaborator";
import useProjects from "../hooks/useProjects";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

function NewCollaborator() {
  const { getProject, project, loading, collaborator, addCollaborator, alert } =
    useProjects();
  const { id } = useParams();

  useEffect(() => {
    getProject(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Loading />;

  if (!project?._id)
    return (
      <div className="max-w-xs mx-auto">
        <Alert
          title={alert.title}
          message={alert.message}
          error={alert.error}
        />
      </div>
    );

  return (
    <>
      <h1 className="text-4xl text-accent font-heading font-bold text-center mt-5">
        Agregar colaborador al proyecto
        <br />
        <span className="text-gray-400 font-semibold text-lg">
          {project?.name}
        </span>
      </h1>

      <div className="mt-10">
        <FormCollaborator />
      </div>

      {loading ? (
        <Loading />
      ) : collaborator?._id ? (
        <div className="mt-10">
          <div className="bg-base-300 p-5 rounded-lg shadow mb-4 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 flex-wrap md:flex-nowrap">
              <div>
                <h4 className="text-2xl font-bold text-gray-700">
                  {collaborator.name}
                </h4>
                <p className="text-gray-600 font-light">{collaborator.email}</p>
              </div>
              <button
                className="btn btn-outline btn-neutral mt-5 md:mt-0"
                type="button"
                onClick={() =>
                  addCollaborator({
                    email: collaborator.email,
                  })
                }
                title="Agregar colaborador"
                aria-label="Agregar colaborador"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                <span>Agregar colaborador</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <div className="bg-base-300 p-5 rounded-lg shadow mb-4 max-w-sm mx-auto">
            <div className="flex justify-center items-center">
              <h4 className="card-title">No hay resultados</h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewCollaborator;
