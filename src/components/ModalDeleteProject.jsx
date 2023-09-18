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
    }
    // delete collaborator
    if (id === "delete-collaborator-modal") {
      handleAccept(handleDeleteCollaboratorModal);
      deleteCollaborator(collaborator);
    }
    // delete project
    else {
      handleAccept(true, projectId);
    }
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        {title && <h3 className="font-bold text-lg text-left">{title}</h3>}
        {text && <p className="py-4 text-left">{text}</p>}
        <div className="modal-action">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it will close the modal */}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-5">
              <button
                type="button"
                className="btn flex-1 sm:flex-none"
                onClick={() => handleModalClose(id)}
              >
                {firstBtnText}
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1 sm:flex-none"
                onClick={() => handleDelete(id)}
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
