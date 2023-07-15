import { Navigate, Route, Routes } from "react-router-dom";
import TopDiscussionsList from "../components/discussions/TopDiscussionsList";
import NavBar from "../components/navBar/NavBar";
import DiscussionDetailPage from "../components/discussions/DiscussionDetailPage";
import { NavigationRoutes } from "./NavigationRoutes";
import ChatPage from "../components/chat/ChatPage";
import SearchUsersPage from "../components/users/SearchUsersPage";
import ProfilePage from "../components/users/ProfilePage";
import { useEffect } from "react";
import SocketConnection from "../hooks/websockets/SocketConnection";

const PrivateRouter = () => {
  useEffect(() => {
    SocketConnection.getInstance();
    return () => {
      SocketConnection.disconnect();
    };
  }, []);

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
          <Route path={NavigationRoutes.CHAT + "/:id"} element={<ChatPage />} />
          <Route
            path={NavigationRoutes.SEARCH_USER}
            element={<SearchUsersPage />}
          />
          <Route
            path={NavigationRoutes.PROFILE + "/:id"}
            element={<ProfilePage />}
          />
          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default PrivateRouter;
