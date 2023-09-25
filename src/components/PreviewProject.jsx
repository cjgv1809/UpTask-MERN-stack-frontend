/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import useAuth from "../hooks/useAuth";

function PreviewProject({ project }) {
  const { auth } = useAuth();

  return (
    <div className="max-w-3xl p-5 mx-auto mb-4 rounded-lg shadow bg-base-300">
      <div className="flex items-start justify-between gap-6">
        <div>
          <span className="text-xl font-bold text-gray-700">
            {project.name}
          </span>{" "}
          <span className="text-lg font-semibold text-gray-400">
            {project.client}
          </span>
          <div className="flex flex-col my-1">
            {auth._id !== project.creator && (
              <div className="badge badge-neutral">Colaborador</div>
            )}
          </div>
        </div>
        <span className="text-xs text-neutral">
          {formatDate(project.deliveryDate)}
        </span>
      </div>
      <Link
        to={`${project._id}`}
        className="link link-neutral"
        data-cy="preview-project-link"
      >
        Ver proyecto
      </Link>
    </div>
  );
}

export default PreviewProject;
