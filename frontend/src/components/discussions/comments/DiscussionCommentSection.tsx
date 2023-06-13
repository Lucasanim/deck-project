import React, { useState } from "react";
import CommentDetail from "../../../models/discussions/CommentDetail";
import CreateCommentComponent from "./CreateCommentComponent";
import { Divider } from "@mui/material";
import DiscussionCommentCard from "./DiscussionCommentCard";

interface Props {
  discussionId: number;
}

const DiscussionCommentSection: React.FC<Props> = (props: Props) => {
  const [comments, setComments] = useState<CommentDetail[]>([]);

  return (
    <div>
      <CreateCommentComponent />
      <Divider className="p-2" />

      {comments.map((comment, index) => (
        <>
          <DiscussionCommentCard key={index} />
          <Divider className="p-1" key={index} />
        </>
      ))}
    </div>
  );
};

export default DiscussionCommentSection;
