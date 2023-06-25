import React, { useEffect, useState } from "react";
import { fetchDiscussions } from "../../services/discussions/DiscussionsService";
import Discussion from "../../models/discussions/Discussion";
import GridList from "../GridList/GridList";
import DiscussionCard from "./DiscussionCard";
import "./style/top-discussions-list.css";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import CreateDiscussionModal from "./CreateDiscussionModal";

const TopDiscussionsList: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const getDiscussions = async () => {
    try {
      const discussions = await fetchDiscussions();
      setDiscussions(discussions.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDiscussionClick = (id: string | number) => {
    navigate("/app/discussion/" + id);
  };

  useEffect(() => {
    getDiscussions();
  }, []);

  return (
    <div className="top-discussions-list">
      <div className="top-discussions-list-container">
        <div className="flex justify-end mb-4">
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={() => setOpenModal(!openModal)}
          >
            New
          </Button>
        </div>
        <GridList
          elements={discussions.map((discussion, index) => (
            <DiscussionCard
              onClick={handleDiscussionClick}
              key={index}
              title={discussion.title}
              body={discussion.body}
              id={discussion.id}
            />
          ))}
        />
      </div>
      <CreateDiscussionModal
        open={openModal}
        close={() => setOpenModal(false)}
      />
    </div>
  );
};

export default TopDiscussionsList;
