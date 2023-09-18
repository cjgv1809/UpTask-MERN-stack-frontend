import { Link, useLocation, useParams } from "react-router-dom";
import translatePathnames from "../utils/translatePathnames";
import useProjects from "../hooks/useProjects";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { id } = useParams();
  const { projects } = useProjects();

  // change project id to project name in breadcrumbs
  const project = projects.find((project) => project._id === id);

  return (
    <nav className="text-sm breadcrumbs">
      <ul className="capitalize flex flex-wrap items-center">
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast && project ? (
            <li key={name} className="py-2">{project?.name}</li>
          ) : isLast ? (
            <li key={name} className="py-2">{translatePathnames(name)}</li>
          ) : (
            <li key={name}>
              <Link to={routeTo} className="py-2">{translatePathnames(name)}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
