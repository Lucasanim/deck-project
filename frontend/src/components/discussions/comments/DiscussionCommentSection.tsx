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
    } catch (e) {}
  };

  const handleCreateComment = (newComment: CommentDetail) => {
    setComments([newComment, ...comments]);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <CreateCommentComponent
        discussionId={props.discussionId}
        onCreate={handleCreateComment}
      />
      <Divider className="p-2" />

      {comments.map((comment, index) => (
        <>
          <DiscussionCommentCard commentDetails={comment} key={index} />
        </>
      ))}
    </div>
  );
};

export default DiscussionCommentSection;
