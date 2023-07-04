import React, { useEffect, useState } from "react";
import {
  fetchDiscussions,
  searchByTitle,
} from "../../services/discussions/DiscussionsService";
import Discussion from "../../models/discussions/Discussion";
import "./style/top-discussions-list.css";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import CreateDiscussionModal from "./CreateDiscussionModal";
import DiscussionsListComponent from "./DiscussionsListComponent";
import SearchInput from "../SearchInput";

const TopDiscussionsList: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [topDiscussions, setTopDiscussions] = useState<Discussion[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const getDiscussions = async () => {
    try {
      const discussions = await fetchDiscussions();
      setDiscussions(discussions.data);
      setTopDiscussions(discussions.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = async (input: string) => {
    try {
      if (input) {
        const discussions = await searchByTitle(input);
        setDiscussions(discussions.data);
      } else {
        setDiscussions(topDiscussions);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDiscussions();
  }, []);

  return (
    <div className="top-discussions-list">
      <div className="top-discussions-list-container">
        <div className="flex justify-between mb-4">
          <SearchInput handleInputChange={handleInputChange} />
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={() => setOpenModal(!openModal)}
          >
            New
          </Button>
        </div>
        <DiscussionsListComponent discussions={discussions} />
      </div>
      <CreateDiscussionModal
        open={openModal}
        close={() => setOpenModal(false)}
      />
    </div>
  );
};

export default TopDiscussionsList;
