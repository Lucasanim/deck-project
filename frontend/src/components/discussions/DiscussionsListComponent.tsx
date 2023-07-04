import React from "react";
import Discussion from "../../models/discussions/Discussion";
import GridList from "../GridList/GridList";
import DiscussionCard from "./DiscussionCard";
import { useNavigate } from "react-router-dom";
interface Props {
  discussions: Discussion[];
}

const DiscussionsListComponent: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  const handleDiscussionClick = (id: string | number) => {
    navigate("/app/discussion/" + id);
  };

  return (
    <GridList
      elements={props.discussions.map((discussion, index) => (
        <DiscussionCard
          onClick={handleDiscussionClick}
          key={index}
          title={discussion.title}
          body={discussion.body}
          id={discussion.id}
        />
      ))}
    />
  );
};

export default DiscussionsListComponent;
