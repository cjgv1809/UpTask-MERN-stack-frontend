import useProjects from "../hooks/useProjects";
import Alert from "../components/Alert";
import PreviewProject from "../components/PreviewProject";

function Projects() {
  const { projects, alert } = useProjects();

  return (
    <>
      <h1 className="text-4xl text-accent font-heading font-bold text-center mt-5">
        Proyectos
      </h1>

      {alert.title && alert.message && alert.error && (
        <Alert
          title={alert.title}
          message={alert.message}
          error={alert.error}
        />
      )}

      {projects.length === 0 ? (
        <p className="text-center mt-10">No hay proyectos</p>
      ) : (
        <div className="mt-10">
          {projects.map((project) => (
            <PreviewProject key={project._id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}

export default Projects;
