import app, { auth } from "../Firebase";
import AuthProvider from "../Context/AuthProvider";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import Login from "./Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboarrd from "./Dashboarrd";
import Profile from "./Profile";
import Layout from "./Layout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboarrd />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <AuthProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
