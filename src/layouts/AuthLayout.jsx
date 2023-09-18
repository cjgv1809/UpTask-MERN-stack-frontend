import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <main className="container mx-auto my-10 md:my-20 p-5 md:flex md:justify-center">
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout;
