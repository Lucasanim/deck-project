import { Navigate, Route, Routes } from "react-router-dom";
import TopDiscussionsList from "../components/discussions/TopDiscussionsList";
import NavBar from "../components/navBar/NavBar";
import DiscussionDetailPage from "../components/discussions/DiscussionDetailPage";
import { NavigationRoutes } from "./NavigationRoutes";
import ChatPage from "../components/chat/ChatPage";

const PrivateRouter = () => {
  return (
    <>
      <NavBar />
      <div className="app-body">
        <Routes>
          <Route
            path={NavigationRoutes.HOME}
            element={<TopDiscussionsList />}
          />
          <Route
            path={NavigationRoutes.DISCUSSION + "/:id"}
            element={<DiscussionDetailPage />}
          />
          <Route path={NavigationRoutes.CHAT} element={<ChatPage />} />
          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default PrivateRouter;
