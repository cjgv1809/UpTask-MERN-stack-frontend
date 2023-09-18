import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import Loading from "../components/Loading";
import FormProject from "../components/FormProject";

function EditProject() {
  const { id } = useParams();
  const { getProject, loading } = useProjects();

  useEffect(() => {
    getProject(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="text-4xl text-accent font-heading font-bold text-center mt-5">
        Editar Proyecto
      </h1>

      <FormProject />
    </>
  );
}

export default EditProject;
