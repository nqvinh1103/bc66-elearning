import { Home } from "pages";
import { useRoutes } from "react-router-dom";
import { MainLayout } from "../components";
import { Account } from "../pages/client/Account/Account";
import { Blog } from "../pages/client/Blog/Blog";
import { Classes } from "../pages/client/Classes/Classes";
import { Detail } from "../pages/client/Detail/Detail";
import { DetailPage } from "../pages/client/DetailPage/DetailPage";
import NotFound from "../pages/client/NotFound/NotFound";
import { RenderCourseCatalog } from "../pages/client/renderCourseCatalog";
const Router = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          path: "",
          element: <Home />,
        },
        {
          path: "/account",
          element: <Account/>
        },
        {
          path: "/danhmuckhoahoc/:maDanhMuc",
          element: <RenderCourseCatalog />,
        },
        {
          path: "/sale",
          element: <NotFound />,
        },
        {
          path: "/giangsinh",
          element: <NotFound />,
        },
        {
          path: "/noel",
          element: <NotFound />,
        },
        {
          path: "/chitiet/:maKhoaHoc",
          element: <DetailPage />,
        },
        {
          path: "/detail",
          element: <Detail />,
        },
        {
          path: "/classes",
          element: <Classes />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
      ],
    },
  ]);
  return routing;
};

export default Router;
