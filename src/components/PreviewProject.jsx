/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import useAuth from "../hooks/useAuth";

function PreviewProject({ project }) {
  const { auth } = useAuth();

  return (
    <div className="bg-base-300 p-5 rounded-lg shadow mb-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-start gap-6">
        <div>
          <span className="text-gray-700 font-bold text-xl">
            {project.name}
          </span>{" "}
          <span className="text-gray-400 font-semibold text-lg">
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
      <Link to={`${project._id}`} className="link link-neutral">
        Ver proyecto
      </Link>
    </div>
  );
}

export default PreviewProject;
