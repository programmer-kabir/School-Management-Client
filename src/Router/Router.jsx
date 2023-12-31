import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Pages/Dashboard/Shared/Profile";
import Sidebar from "../Component/Dashboard/Sidebar";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import ManageStudent from "../Pages/Dashboard/Admin/ManageStudent";
import AllClass from "../Pages/AllClass/AllClass";
import PrivateRoute from "./PriverRoute";
import ClassDetails from "../Component/AllClass/ClassDetails";
import BookMark from "../Pages/Dashboard/User/BookMark/Booked";
import BookMarkDetails from "../Component/Dashboard/BookMark/BookMarkDetails";
import Booked from "../Pages/Dashboard/User/BookMark/Booked";
import Payment from "../Pages/Dashboard/User/Payment/Payment";
import EnrolCourse from "../Pages/Dashboard/User/EnrolCourse/EnrolCourse";
import TermsAndConditions from "../Component/Home/TermsAndConditions";
import Favorite from "../Pages/Favorite/Favorite";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PaymentSuccessfully from "../Pages/Dashboard/User/Payment/PaymentSuccessfully";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<ErrorPage />,
    children: [
      {
        path:"/",
        element:<Home />
      },
      {
        path: "/all-class",
        element: <AllClass />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/all-class/:id",
        element: <ClassDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_LOCALHOST_KEY}/all-class/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/terms",
        element: <TermsAndConditions />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path:'/dashboard/home',
        element: <AdminDashboard />
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "manage-users",
        element: <ManageUser />,
      },
      {
        path: "manage-students",
        element: <ManageStudent />,
      },
      {
        path: "booked",
        element: <Booked />,
      },
      {
        path: "payment",
        element: <Payment />,        
      },
      {
        path: "enrol-course",
        element: <EnrolCourse />,
      },
      {
        path:"payment/successfully/:tran_id",
        element:<PaymentSuccessfully />
      }
    ],
  },
]);

export default router;
