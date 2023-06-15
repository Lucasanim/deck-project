import React, { useEffect, useState } from "react";
import CommentDetail from "../../../models/discussions/CommentDetail";
import CreateCommentComponent from "./CreateCommentComponent";
import { Divider } from "@mui/material";
import DiscussionCommentCard from "./DiscussionCommentCard";
import { fetchCommentsByDiscussionId } from "../../../services/discussions/comments/CommentsService";

interface Props {
  discussionId: number;
}

const DiscussionCommentSection: React.FC<Props> = (props: Props) => {
  const [comments, setComments] = useState<CommentDetail[]>([]);

  const getComments = async () => {
    try {
      const comments = await fetchCommentsByDiscussionId(props.discussionId);
      setComments(comments.data);
    } catch(e) {

    }
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <div>
      <CreateCommentComponent />
      <Divider className="p-2" />

      {comments.map((comment, index) => (
        <>
          <DiscussionCommentCard commentDetails={comment} key={index} />
          <Divider className="p-1" key={index} />
        </>
      ))}
    </div>
  );
};

export default DiscussionCommentSection;
