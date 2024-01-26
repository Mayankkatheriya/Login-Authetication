// Importing 'app' and 'auth' from the "../Firebase" module
import app, { auth } from "../Firebase";

// Importing the 'AuthProvider' component from the "../Context/AuthProvider" module
import AuthProvider from "../Context/AuthProvider";

// Importing the 'Signup', 'Login', 'Dashboarrd', 'Profile', 'Layout', and 'ForgotPassword' components
import Signup from "./Signup";
import Login from "./Login";
import Dashboarrd from "./Dashboarrd";
import Profile from "./Profile";
import Layout from "./Layout";
import ForgotPassword from "./ForgotPassword";

// Importing 'RouterProvider' and 'createBrowserRouter' from "react-router-dom"
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Defining the main 'App' component
function App() {
  // Creating a router using 'createBrowserRouter' and defining routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Layout component is rendered for the root path
      children: [
        {
          path: "/",
          element: <Dashboarrd />, // Dashboarrd component is rendered for the root path under Layout
        },
        {
          path: "/profile",
          element: <Profile />, // Profile component is rendered for the "/profile" path under Layout
        },
      ],
    },
    {
      path: "/signup",
      element: <Signup />, // Signup component is rendered for the "/signup" path
    },
    {
      path: "/login",
      element: <Login />, // Login component is rendered for the "/login" path
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />, // ForgotPassword component is rendered for the "/forgotpassword" path
    },
  ]);

  // Wrapping the entire application with the 'AuthProvider'
  return (
    <AuthProvider>
      <div className="App">
        {/* Providing the router to the app using 'RouterProvider' */}
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

// Exporting the 'App' component as the default export
export default App;
