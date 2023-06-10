import { Route, Routes } from "react-router-dom";
import TopDiscussionsList from "../components/discussions/TopDiscussionsList";
import NavBar from "../components/navBar/NavBar";

const PrivateRouter = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<TopDiscussionsList />} />
      </Routes>
    </>
  );
};

export default PrivateRouter;
