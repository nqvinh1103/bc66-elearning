import { useRoutes } from "react-router-dom";
import { MainLayout } from "../components";
import { Home } from "pages";

const Router = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);
  return routing;
};

export default Router;
