import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";

let socket;

const ProjectsContext = createContext();

// eslint-disable-next-line react/prop-types
const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    error: false,
  });
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({});
  const [collaborator, setCollaborator] = useState({});
  const [searchBar, setSearchBar] = useState(false);
  const { auth } = useAuth();

  const showAlert = (title, message, error) => {
    setAlert({
      title,
      message,
      error,
    });
    setTimeout(() => {
      setAlert({});
    }, 3000);
  };

  const submitProject = async (project) => {
    if (project.id) {
      await updateProject(project);
    } else {
      await createProject(project);
    }
  };

  const updateProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        `/projects/${project.id}`,
        project,
        config
      );

      setProjects(
        projects.map((projectState) =>
          projectState._id === data._id ? data : projectState
        )
      );
      showAlert(
        "Proyecto actualizado",
        "El proyecto se ha actualizado correctamente"
      );
      setTimeout(() => {
        navigate("/projects");
      }, 3000);
    } catch (error) {
      showAlert("Error", "Hubo un error al actualizar el proyecto", true);
    }
  };

  const createProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("/projects", project, config);
      setProjects([...projects, data]);
      showAlert("Proyecto creado", "El proyecto se ha creado correctamente");
      setTimeout(() => {
        navigate("/projects");
      }, 3000);
    } catch (error) {
      showAlert("Error", "Hubo un error al crear el proyecto", true);
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient.get("/projects", config);
        setProjects(data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getProjects();
  }, [auth, projects.length]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    socket = io(process.env.BACKEND_URL);
  }, []);

  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.get(`/projects/${id}`, config);
      setProject(data);
    } catch (error) {
      console.log(error.response);
      showAlert("Error", error.response?.data?.message, true);
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.delete(`/projects/${id}`, config);
      setProjects(projects.filter((project) => project._id !== id));
      showAlert(data.message, "El proyecto se ha eliminado correctamente");
      setTimeout(() => {
        navigate("/projects");
      }, 3000);
    } catch (error) {
      showAlert("Error", "Hubo un error al eliminar el proyecto", true);
    }
  };

  const handleModalOpen = (id) => {
    const myModal = document.getElementById(id);
    myModal.showModal();
  };

  const handleModalClose = (id) => {
    const myModal = document.getElementById(id);
    myModal.close();
  };

  const handleConfirm = (isAccepted, id) => {
    if (isAccepted) {
      deleteProject(id);
    }
  };

  const submitTask = async (task) => {
    if (task?.idToEdit) {
      await updateTask(task);
    } else {
      await createTask(task);
    }
  };

  const updateTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        `/tasks/${task.idToEdit}`,
        task,
        config
      );

      // socket.io
      socket.emit("update-task", data);
      showAlert(
        "Tarea actualizada",
        "La tarea se ha actualizado correctamente"
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const createTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("/tasks", task, config);

      showAlert("Tarea creada", "La tarea se ha creado correctamente");
      // socket.io
      socket.emit("new-task", data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deleteTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.delete(`/tasks/${task._id}`, config);

      // socket.io
      socket.emit("delete-task", task);
      showAlert(data.message, "La tarea se ha eliminado correctamente");
      setTask({});
    } catch (error) {
      showAlert("Error", "Hubo un error al eliminar la tarea", true);
    }
  };

  const handleDeleteTaskModal = (task) => {
    setTask(task);
    handleModalOpen("delete-task-modal");
  };

  const handleEditTaskModal = (task) => {
    setTask(task);
    handleModalOpen("edit-task-modal");
  };

  const handleDeleteCollaboratorModal = (collaborator) => {
    setCollaborator(collaborator);
    handleModalOpen("delete-collaborator-modal");
  };

  const submitCollaborator = async (email) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(
        "/projects/collaborators",
        { email },
        config
      );
      setCollaborator(data);
    } catch (error) {
      showAlert("Error", error.response.data.message, true);
    } finally {
      setLoading(false);
    }
  };

  const addCollaborator = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post(
        `/projects/collaborators/${project._id}`,
        email,
        config
      );
      showAlert("Colaborador agregado", data.message);
      setCollaborator({});
    } catch (error) {
      showAlert("Error", error.response.data.message, true);
    }
  };

  const deleteCollaborator = async (collaborator) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/projects/delete-collaborator/${project._id}`,
        { id: collaborator._id },
        config
      );
      setProject({
        ...project,
        collaborators: project.collaborators.filter(
          (collaboratorState) => collaboratorState._id !== collaborator._id
        ),
      });
      showAlert("Colaborador eliminado", data.message);
      setCollaborator({});
    } catch (error) {
      showAlert("Error", error.response.data.message, true);
    }
  };

  const completeTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/tasks/status/${taskId}`,
        {},
        config
      );

      // socket.io
      socket.emit("complete-task", data);
      setTask({});
      showAlert("Tarea completada", data.message);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  // socket.io
  const submitTaskProject = (task) => {
    const newProject = {
      ...project,
      tasks: [...project.tasks, task],
    };
    setProject(newProject);
  };

  const deleteTaskProject = (task) => {
    const newProject = {
      ...project,
      tasks: project.tasks.filter((taskState) => taskState._id !== task._id),
    };
    setProject(newProject);
  };

  const updateTaskProject = (task) => {
    const newProject = {
      ...project,
      tasks: project.tasks.map((taskState) =>
        taskState._id === task._id ? task : taskState
      ),
    };
    setProject(newProject);
  };

  const completeTaskProject = (task) => {
    const newProject = {
      ...project,
      tasks: project.tasks.map((taskState) =>
        taskState._id === task._id ? task : taskState
      ),
    };
    setProject(newProject);
  };

  const logoutUserProjects = () => {
    setProjects([]);
    setProject({});
    setAlert({});
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        loading,
        deleteProject,
        handleModalOpen,
        handleModalClose,
        handleConfirm,
        submitTask,
        handleEditTaskModal,
        task,
        handleDeleteTaskModal,
        deleteTask,
        submitCollaborator,
        collaborator,
        setCollaborator,
        addCollaborator,
        handleDeleteCollaboratorModal,
        deleteCollaborator,
        completeTask,
        handleSearchBar,
        searchBar,
        submitTaskProject,
        deleteTaskProject,
        updateTaskProject,
        completeTaskProject,
        logoutUserProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };
export default ProjectsContext;
