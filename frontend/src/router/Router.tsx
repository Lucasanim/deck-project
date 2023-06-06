import { Route, Routes } from "react-router-dom";
import DiscussionList from "../components/discussions/DiscussionList";
import App from "../App";
import AuthenticationComponent from "../components/authentication/AuthenticationComponent";
import ProtectedRoute from "../components/router/ProtectedRoute";

const PrivateRouter = () => {
  return (
    <Routes>
      <Route path="/app" element={<App />} />
      <Route path="/discussions" element={<DiscussionList />} />
    </Routes>
  );
};

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/authentication" element={<AuthenticationComponent />} />
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <PrivateRouter />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RootRouter;
