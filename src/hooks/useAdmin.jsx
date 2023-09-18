import useAuth from "./useAuth";
import useProjects from "./useProjects";

const useAdmin = () => {
  const { auth } = useAuth();
  const { project } = useProjects();

  return project?.creator === auth?._id;
};

export default useAdmin;
