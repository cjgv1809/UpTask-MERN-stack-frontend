import { translatedRoutes } from "../constants/routesNames";

const translatePathnames = (pathname) => {
  return translatedRoutes[pathname] ? translatedRoutes[pathname] : pathname;
};

export default translatePathnames;
