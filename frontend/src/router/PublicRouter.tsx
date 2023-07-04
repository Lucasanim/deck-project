import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticationComponent from "../components/authentication/AuthenticationComponent";
import { useSelector } from "react-redux";
import { StoreData } from "../redux/store/Store";
import { NavigationRoutes } from "./NavigationRoutes";

const PublicRouter = () => {
  const isUserLoggedIn = useSelector(
    (store: StoreData) => store?.auth?.token?.accessToken
  );
  return (
    <>
      <Routes>
        {!isUserLoggedIn && (
          <Route
            path={NavigationRoutes.AUTHENTICATION}
            element={<AuthenticationComponent />}
          />
        )}
        <Route
          path="*"
          element={<Navigate to={"/app" + NavigationRoutes.HOME} replace />}
        />
      </Routes>
    </>
  );
};

export default PublicRouter;
