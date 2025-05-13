import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { login, isAuthReady } from "./app/features/userSlice";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";

export default function App() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((store) => store.user);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(isAuthReady());
      }
    });

    return () => unsub();
  }, [dispatch]);

  if (!isAuth) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <RootLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: ":id",
          element: <Details />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" replace /> : <Signup />,
    },
  ]);

  return <RouterProvider router={routes} />;
}
