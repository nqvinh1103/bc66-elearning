import { Home } from "pages";
import { useRoutes } from "react-router-dom";
import { MainLayout } from "../components";
import { AdminGuard } from "../guard/AdminGuard";
import { AuthGuard } from "../guard/AuthGuard";
import { Admin } from "../pages/admin/Admin";
import { Account } from "../pages/client/Account/Account";
import { Blog } from "../pages/client/Blog/Blog";
import { Classes } from "../pages/client/Classes/Classes";
import { PATH } from "../constants/path";
import { Detail } from "../pages/client/Detail/Detail";
import { DetailPage } from "../pages/client/DetailPage/DetailPage";
import NotFound from "../pages/client/NotFound/NotFound";
import { RenderCourseCatalog } from "../pages/client/renderCourseCatalog";
import { CourseList } from "../pages/admin/course/CourseList";
import { CourseCreate } from "../pages/admin/course/CourseCreate";
import { CourseUpdate } from "../pages/admin/course/CourseUpdate";
import { UserList } from "../pages/admin/user/UserList";
import { UserCreate } from "../pages/admin/user/UserCreate";
import { UserUpdate } from "../pages/admin/user/UserUpdate";
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
          element: (
            <AuthGuard>
              <Account />
            </AuthGuard>
          ),
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
    {
      path: PATH.admin,
      element: (
        <AdminGuard>
          <Admin />
        </AdminGuard>
      ),
      children: [
        {
          index: true,
        },
        {
          children: [
            {
              path: PATH.course,
              element: <CourseList />,
            },
            {
              path: PATH.createCourse,
              element: <CourseCreate />,
            },
            {
              path: PATH.updateCourse,
              element: <CourseUpdate />,
            },
            {
              path: PATH.user,
              element: <UserList />,
            },
            {
              path: PATH.createUser,
              element: <UserCreate />,
            },
            {
              path: PATH.updateUser,
              element: <UserUpdate />,
            },
            {
              path: "*",
              element: <NotFound />,
            },
          ],
        },
      ],
    },
  ]);
  return routing;
};

export default Router;
