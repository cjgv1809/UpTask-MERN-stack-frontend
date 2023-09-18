/* eslint-disable react/prop-types */
import useProjects from "../hooks/useProjects";
import formatDate from "../utils/formatDate";
import useAdmin from "../hooks/useAdmin";

function Task({ task, handleDeleteTaskModal }) {
  const { handleEditTaskModal, completeTask } = useProjects();
  const admin = useAdmin();

  return (
    <div className="card compact bordered bg-base-200 shadow z-10 lg:z-40">
      <div className="card-body">
        <h3 className="card-title">{task?.name}</h3>
        <p className="text-gray-500">Prioridad: {task?.priority}</p>
        <p className="text-gray-500">Fecha: {formatDate(task?.deliveryDate)}</p>
        <p className="text-gray-500">Descripción: {task?.description}</p>
        {task?.status && (
          <>
            <p className="text-gray-500">Completada por:</p>
            <div className="badge badge-accent text-white">
              {task?.completed?.name && task?.completed?.name}
            </div>
          </>
        )}

        <div className="form-control">
          <p className="text-gray-500">Estado:</p>
          <label className="label px-0 cursor-pointer justify-start items-center">
            <input
              type="checkbox"
              className="toggle toggle-accent mr-4"
              onChange={() => completeTask(task?._id)}
              checked={task?.status}
            />
            <span className="label-text text-neutral font-semibold">
              {task?.status ? "Completa" : "Incompleta"}
            </span>
          </label>
        </div>

        {admin && (
          <div className="flex flex-col md:flex-row md:justify-end gap-2 mt-5 md:mt-0">
            <button
              className="btn md:btn-square btn-outline btn-neutral"
              type="button"
              title="Editar tarea"
              onClick={() => handleEditTaskModal(task)}
              aria-label="Editar tarea"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
              <span className="md:hidden">Editar tarea</span>
            </button>

            <button
              className="btn md:btn-square btn-outline btn-primary"
              type="button"
              title="Eliminar tarea"
              onClick={() => handleDeleteTaskModal(task)}
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
              <span className="md:hidden">Eliminar tarea</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
