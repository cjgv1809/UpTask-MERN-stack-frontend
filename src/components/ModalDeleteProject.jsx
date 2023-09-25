/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";

function ModalDeleteProject({
  id,
  title,
  text,
  firstBtnText,
  secondBtnText,
  handleAccept,
}) {
  const {
    handleModalClose,
    handleDeleteTaskModal,
    deleteTask,
    task,
    handleDeleteCollaboratorModal,
    deleteCollaborator,
    collaborator,
  } = useProjects();
  const { id: projectId } = useParams();

  const handleDelete = (id) => {
    // delete task
    if (id === "delete-task-modal") {
      handleAccept(handleDeleteTaskModal);
      deleteTask(task);
      return;
    }
    // delete collaborator
    if (id === "delete-collaborator-modal") {
      handleAccept(handleDeleteCollaboratorModal);
      deleteCollaborator(collaborator);
      return;
    }
    // delete project
    else {
      handleAccept(true, projectId);
      return;
    }
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        {title && <h3 className="text-lg font-bold text-left">{title}</h3>}
        {text && <p className="py-4 text-left">{text}</p>}
        <div className="modal-action">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it will close the modal */}
            <div className="flex flex-col gap-2 mt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="flex-1 btn sm:flex-none"
                onClick={() => handleModalClose(id)}
              >
                {firstBtnText}
              </button>
              <button
                type="submit"
                className="flex-1 btn btn-primary sm:flex-none"
                onClick={() => handleDelete(id)}
                data-cy="delete-action-button"
              >
                {secondBtnText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ModalDeleteProject;
