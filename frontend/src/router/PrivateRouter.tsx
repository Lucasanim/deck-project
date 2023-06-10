import { Route, Routes } from "react-router-dom";
import TopDiscussionsList from "../components/discussions/TopDiscussionsList";
import NavBar from "../components/navBar/NavBar";
import DiscussionDetailPage from "../components/discussions/DiscussionDetailPage";

const PrivateRouter = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<TopDiscussionsList />} />
        <Route path="/discussion/:id" element={<DiscussionDetailPage />} />
      </Routes>
    </>
  );
};

export default PrivateRouter;
