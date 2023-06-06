import { Route, Routes } from "react-router-dom";
import AuthenticationComponent from "../components/authentication/AuthenticationComponent";
import ProtectedRoute from "../components/router/ProtectedRoute";
import PrivateRouter from "./PrivateRouter";

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
