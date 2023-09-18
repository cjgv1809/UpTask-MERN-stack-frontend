/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProjects from "../hooks/useProjects";

function Sidebar({ isOpen, toggleSidebar, hamburgerButtonRef }) {
  const { auth } = useAuth();
  const BREAKPOINT = 1024;
  const [shouldRenderSidebar, setShouldRenderSidebar] = useState(true);
  const { logoutUserProjects } = useProjects();
  const { logoutAuth } = useAuth();

  const handleLogout = () => {
    logoutUserProjects();
    logoutAuth();
    localStorage.removeItem("token");
  };

  //create a function to detect if it's mobile
  const isMobileOrTablet = () => {
    if (window.innerWidth <= BREAKPOINT) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const hamburgerButton = hamburgerButtonRef.current;
    // Add the event listener when the sidebar is open
    if (isOpen) {
      hamburgerButton.addEventListener("click", toggleSidebar);
    }

    // Remove the event listener when the component unmounts or the sidebar is closed
    return () => {
      if (isOpen) {
        // Remove event listener from the hamburgerButtonRef
        hamburgerButton.removeEventListener("click", toggleSidebar);
      }
    };
  }, [isOpen, toggleSidebar, hamburgerButtonRef]);

  const handleWindowResize = () => {
    if (!isOpen && !isMobileOrTablet()) {
      setShouldRenderSidebar(true);
    } else {
      setShouldRenderSidebar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [isOpen]);

  return (
    <>
      {(shouldRenderSidebar || isOpen) && (
        <aside className="p-0 lg:drawer lg:drawer-open lg:w-64 bg-base-200 lg:p-5 z-50 lg:z-40">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
          </div>
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-auto min-h-screen bg-base-200 text-base-content space-y-3">
              <div>
                <Link
                  to="/projects"
                  onClick={toggleSidebar}
                  className="normal-case text-2xl font-black"
                >
                  UpTask
                </Link>
              </div>
              <div className="divider"></div>
              <p className="text-xl mt-4 lg:mt-0">
                Hola, <span className="font-bold">{auth.name}</span>
              </p>
              {/* Sidebar content here */}
              <li>
                <Link
                  to="create-project"
                  onClick={toggleSidebar}
                  className="flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>
                  <span>Crear Nuevo Proyecto</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Cerrar Sesión</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}

export default Sidebar;
