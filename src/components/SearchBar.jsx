import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";
import useProjects from "../hooks/useProjects";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const {
    searchBar: searchBarState,
    handleSearchBar,
    projects,
  } = useProjects();
  const navigate = useNavigate();

  const handleNavigateInSearchBar = (projectId) => {
    // When a project is selected, navigate to its page
    navigate(`/projects/${projectId}`);
    handleSearchBar();
  };

  const filteredProjects =
    search === ""
      ? []
      : projects.filter((project) =>
          project.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <Transition.Root
      show={searchBarState}
      as={Fragment}
      afterLeave={() => setSearch("")}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20"
        onClose={handleSearchBar}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(project) => handleNavigateInSearchBar(project._id)}
          >
            <div className="relative">
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent rounded-md pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Buscar proyecto"
                displayValue={(project) => project.name}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 absolute top-3 left-3 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                {filteredProjects.length > 0 ? (
                  <Combobox.Options
                    static
                    className="w-full rounded-md space-y-2 bg-white max-h-72 scroll-py-2 overflow-y-auto text-sm text-gray-800"
                  >
                    {filteredProjects.map((project) => (
                      <Combobox.Option
                        key={project._id}
                        value={project}
                        className={({ active, selected }) =>
                          `${
                            active
                              ? "bg-gray-100"
                              : selected
                              ? "bg-gray-200"
                              : ""
                          } cursor-pointer select-none relative py-2 pl-10 pr-4`
                        }
                      >
                        {({ selected }) => (
                          <>
                            {selected && <CheckIcon className="h-6 w-6" />}
                            {project.name}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                ) : (
                  <Combobox.Options
                    static
                    className="w-full rounded-md space-y-2 bg-white max-h-72 scroll-py-2 overflow-y-auto text-sm text-gray-800"
                  >
                    <Combobox.Option
                      value="No se encontraron proyectos"
                      className="cursor-pointer select-none relative py-2 pl-10 pr-4"
                    >
                      No se encontraron proyectos
                    </Combobox.Option>
                  </Combobox.Options>
                )}
              </Transition>
            </div>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default SearchBar;
