import { useRef, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";

function ProtectedRoute() {
  const { auth, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hamburgerButtonRef = useRef();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) return <Loading />;

  return (
    <>
      {auth._id ? (
        <div>
          <Header
            toggleSidebar={toggleSidebar}
            hamburgerButtonRef={hamburgerButtonRef}
          />

          <div className="md:flex min-h-screen bg-base-100">
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              hamburgerButtonRef={hamburgerButtonRef}
            />

            <main className="md:flex-1 w-full p-5 pb-20">
              <Breadcrumbs />
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default ProtectedRoute;
