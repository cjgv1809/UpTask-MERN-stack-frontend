/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";

function Header({ toggleSidebar, hamburgerButtonRef }) {
  const { handleSearchBar, logoutUserProjects } = useProjects();
  const { logoutAuth } = useAuth();

  const handleLogout = () => {
    logoutUserProjects();
    logoutAuth();
    localStorage.removeItem("token");
  };

  return (
    <header className="navbar justify-between md:justify-normal bg-neutral text-neutral-content p-5 sticky top-0 z-40 lg:z-50">
      <button
        type="button"
        className="flex-none lg:hidden"
        onClick={toggleSidebar}
        ref={hamburgerButtonRef}
      >
        <label
          htmlFor="my-drawer-2"
          className="btn btn-circle swap swap-rotate mr-2"
        >
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </button>
      <div className="hidden md:block flex-1">
        <Link to="/projects" className="normal-case text-xl font-black">
          UpTask
        </Link>
      </div>
      <div className="flex-none gap-4">
        <div className="form-control">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleSearchBar}
            title="Buscar proyecto"
            aria-label="Buscar proyecto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden md:block">Buscar proyecto</span>
          </button>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="rounded-full">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/material-rounded/48/000000/user-male-circle.png"
                alt="imagen de usuario"
                className="bg-base-100 rounded-full"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 text-gray-600 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/projects/create-project"}>Crear proyecto</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Cerrar sesión</Link>
            </li>
          </ul>
        </div>
      </div>

      <SearchBar />
    </header>
  );
}

export default Header;
