import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import DiscussionList from "../components/discussions/DiscussionList";
import App from "../App";
import AuthenticationComponent from "../components/authentication/AuthenticationComponent";

export default createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/discussions",
      element: <DiscussionList />,
    },
    {
      path: "/authentication",
      element: <AuthenticationComponent />
    },
  ]);