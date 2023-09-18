import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import useProjects from "../hooks/useProjects";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import ModalCreateTask from "../components/ModalCreateTask";
import ModalDeleteProject from "../components/ModalDeleteProject";
import Task from "../components/Task";
import Collaborator from "../components/Collaborator";

let socket;

function Project() {
  const { id } = useParams();
  const {
    project,
    getProject,
    loading,
    alert,
    handleModalOpen,
    handleConfirm,
    handleDeleteTaskModal,
    task,
    submitTaskProject,
    deleteTaskProject,
    updateTaskProject,
    completeTaskProject,
  } = useProjects();
  const admin = useAdmin();

  useEffect(() => {
    getProject(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    socket = io(process.env.BACKEND_URL);

    socket.emit("open-project", id);
  }, []);

  useEffect(() => {
    socket.on("new-task-added", (newTask) => {
      if (newTask.project === project._id) {
        submitTaskProject(newTask);
      }
    });

    socket.on("task-deleted", (deletedTask) => {
      if (deletedTask.project === project._id) {
        deleteTaskProject(deletedTask);
      }
    });

    socket.on("task-updated", (updatedTask) => {
      if (updatedTask.project._id === project._id) {
        updateTaskProject(updatedTask);
      }
    });

    socket.on("task-completed", (completedTask) => {
      if (completedTask.project._id === project._id) {
        completeTaskProject(completedTask);
      }
    });
  });

  return (
    <>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="max-w-7xl mx-auto mt-10">
            <div className="mt-5">
              {alert.title && alert.message && (
                <Alert
                  title={alert.title}
                  message={alert.message}
                  error={alert.error}
                />
              )}
            </div>
            <div className="mt-5">
              <div className="flex justify-between items-center gap-4 flex-wrap md:flex-nowrap">
                <h2 className="text-3xl text-accent font-heading font-bold">
                  {project.name}
                </h2>
                {admin && (
                  <div className="w-full md:w-auto mt-5 md:mt-0">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                      <Link
                        to={`/projects/edit/${id}`}
                        className="btn md:btn-square btn-outline btn-neutral"
                        title="Editar proyecto"
                        aria-label="Editar proyecto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                        </svg>
                        <span className="md:hidden">Editar proyecto</span>
                      </Link>

                      <button
                        type="button"
                        className="btn md:btn-square btn-primary btn-outline"
                        onClick={() => handleModalOpen("delete-modal")}
                        title="Eliminar proyecto"
                        aria-label="Eliminar proyecto"
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
                        <span className="md:hidden">Eliminar proyecto</span>
                      </button>
                    </div>

                    <ModalDeleteProject
                      id="delete-modal"
                      title="Eliminar proyecto"
                      text="¿Estás seguro de eliminar este proyecto? Esta acción no se puede deshacer."
                      handleAccept={handleConfirm}
                      firstBtnText="Cancelar"
                      secondBtnText="Si, Eliminar"
                    />

                    <ModalDeleteProject
                      id="delete-task-modal"
                      title="Eliminar tarea"
                      text="¿Estás seguro de eliminar esta tarea? Esta acción no se puede deshacer."
                      handleAccept={() => handleDeleteTaskModal(task)}
                      firstBtnText="Cancelar"
                      secondBtnText="Si, Eliminar"
                    />
                  </div>
                )}
              </div>
            </div>

            {admin && (
              <button
                type="button"
                className="btn btn-primary mt-10 md:mt-5 w-full md:w-auto"
                onClick={() => handleModalOpen("create-task-modal")}
                title="Crear tarea"
                aria-label="Crear tarea"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                Crear tarea
              </button>
            )}

            <ModalCreateTask
              id="create-task-modal"
              title="Crear tarea"
              text=""
              handleAccept={() => {}}
              firstBtnText="Cancelar"
              secondBtnText="Crear"
            />

            <ModalCreateTask
              id="edit-task-modal"
              title="Editar tarea"
              text=""
              handleAccept={() => {}}
              firstBtnText="Cancelar"
              secondBtnText="Guardar"
            />

            <h2 className="text-xl font-bold my-10">Tareas del proyecto</h2>

            {project.tasks?.length === 0 ? (
              <div className="card compact bordered bg-base-200 shadow my-5">
                <div className="card-body">
                  <h3 className="card-title self-center">
                    No hay tareas en este proyecto
                  </h3>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {project.tasks?.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    handleDeleteTaskModal={handleDeleteTaskModal}
                  />
                ))}
              </div>
            )}

            {admin && (
              <>
                <div className="flex justify-between items-center my-10">
                  <h2 className="text-xl font-bold">
                    Colaboradores del proyecto
                  </h2>
                  <div>
                    <Link
                      to={`/projects/add-collaborator/${project._id}`}
                      className="btn btn-square btn-outline btn-neutral"
                      title="Agregar colaborador"
                      aria-label="Agregar colaborador"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 cursor-pointer"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="mt-5">
                  {project.collaborators?.length === 0 ? (
                    <div className="card compact bordered bg-base-200 shadow">
                      <div className="card-body">
                        <h3 className="card-title self-center">
                          No hay colaboradores en este proyecto
                        </h3>
                      </div>
                    </div>
                  ) : (
                    project.collaborators?.map((collaborator) => (
                      <Collaborator
                        key={collaborator._id}
                        collaborator={collaborator}
                      />
                    ))
                  )}
                </div>
              </>
            )}

            <ModalDeleteProject
              id="delete-collaborator-modal"
              title="Eliminar colaborador"
              text="¿Estás seguro de eliminar este colaborador? Esta acción no se puede deshacer."
              handleAccept={() => {}}
              firstBtnText="Cancelar"
              secondBtnText="Si, Eliminar"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Project;
