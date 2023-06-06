import { Route, Routes } from "react-router-dom";
import DiscussionList from "../components/discussions/DiscussionList";
import NavBar from "../components/navBar/NavBar";

const PrivateRouter = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/discussions" element={<DiscussionList />} />
      </Routes>
    </>
  );
};

export default PrivateRouter;
