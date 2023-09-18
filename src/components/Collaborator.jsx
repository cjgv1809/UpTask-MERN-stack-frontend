import useProjects from "../hooks/useProjects";

/* eslint-disable react/prop-types */
function Collaborator({ collaborator }) {
  const { handleDeleteCollaboratorModal } = useProjects();

  return (
    <div className="card compact bordered bg-base-200 shadow z-10 lg:z-40">
      <div className="card-body">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 flex-wrap md:flex-nowrap">
          <div>
            <h4 className="card-title">{collaborator.name}</h4>
            <p className="card-subtitle">{collaborator.email}</p>
          </div>
          <button
            className="btn btn-outline btn-primary mt-5 md:mt-0"
            type="button"
            title="Eliminar colaborador"
            onClick={() => handleDeleteCollaboratorModal(collaborator)}
            aria-label="Eliminar colaborador"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>Eliminar colaborador</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Collaborator;
