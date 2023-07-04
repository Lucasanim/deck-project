import { Navigate, Route, Routes } from "react-router-dom";
import TopDiscussionsList from "../components/discussions/TopDiscussionsList";
import NavBar from "../components/navBar/NavBar";
import DiscussionDetailPage from "../components/discussions/DiscussionDetailPage";
import { NavigationRoutes } from "./NavigationRoutes";

const PrivateRouter = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={NavigationRoutes.HOME} element={<TopDiscussionsList />} />
        <Route
          path={NavigationRoutes.DISCUSSION + "/:id"}
          element={<DiscussionDetailPage />}
        />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </>
  );
};

export default PrivateRouter;
