import { useContext } from "react";
import ProjectsContext from "../context/ProjectsProvider";

const useProjects = () => {
  const context = useContext(ProjectsContext);

  return context;
};

export default useProjects;
