import React, { useEffect, useState } from "react";
import { fetchDiscussions } from "../../services/discussions/DiscussionsService";
import Discussion from "../../models/discussions/Discussion";
import GridList from "../GridList/GridList";
import DiscussionCard from "./DiscussionCard";
import "./style/top-discussions-list.css";

const TopDiscussionsList: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  const getDiscussions = async () => {
    try {
      const discussions = await fetchDiscussions();
      setDiscussions(discussions.data);
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
        <GridList
          elements={discussions.map((discussion, index) => (
            <DiscussionCard
              key={index}
              title={discussion.title}
              body={discussion.body}
            />
          ))}
        />
      </div>
    </div>
  );
};

export default TopDiscussionsList;
