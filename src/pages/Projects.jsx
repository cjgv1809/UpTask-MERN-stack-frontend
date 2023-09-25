import useProjects from "../hooks/useProjects";
import Alert from "../components/Alert";
import PreviewProject from "../components/PreviewProject";

function Projects() {
  const { projects, alert } = useProjects();

  return (
    <>
      <h1 className="mt-5 text-4xl font-bold text-center text-accent font-heading">
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
        <p className="mt-10 text-center" data-cy="no-projects-text">
          No hay proyectos
        </p>
      ) : (
        <div className="mt-10" data-cy="projects-list">
          {projects.map((project) => (
            <PreviewProject key={project._id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}

export default Projects;
