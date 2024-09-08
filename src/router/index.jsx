import { Home } from "pages";
import { useRoutes } from "react-router-dom";
import { MainLayout } from "../components";
import { BackEnd } from "../pages/client/DanhMuc/BackEnd/BackEnd";
import { DiDong } from "../pages/client/DanhMuc/DiDong/DiDong";
import { FrontEnd } from "../pages/client/DanhMuc/FrontEnd/FrontEnd";
import { FullStack } from "../pages/client/DanhMuc/FullStack/FullStack";
import { TuDuy } from "../pages/client/DanhMuc/TuDuy/TuDuy";
import { Web } from "../pages/client/DanhMuc/Web/Web";
import NotFound from "../pages/client/NotFound/NotFound";
const Router = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          path:"",
          element: <Home />,
        },
        {
          path: "/backend",
          element: <BackEnd/>
        },
        {
          path: "/didong",
          element: <DiDong/>
        },
        {
          path: "/frontend",
          element: <FrontEnd/>
        },
        {
          path: "/fullstack",
          element: <FullStack/>
        },
        {
          path: "/tuduy",
          element: <TuDuy/>
        },
        {
          path: "/web",
          element: <Web/>
        },
        {
          path: "/sale",
          element: <NotFound/>
        },
        {
          path: "/giangsinh",
          element: <NotFound/>
        },
        {
          path: "/noel",
          element: <NotFound/>
        },
      ],
    },
  ]);
  return routing;
};

export default Router;
