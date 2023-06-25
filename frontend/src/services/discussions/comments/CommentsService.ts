import Comment from "../../../models/discussions/Comment";
import CommentDetail from "../../../models/discussions/CommentDetail";
import { GenericClient } from "../../genericClient/genericClient";

const instance = new GenericClient("/discussions/comment");

export const fetchCommentsByDiscussionId = (discussionId: string | number) => {
    return instance.get<CommentDetail[]>(`/get-from-discussion/${discussionId}`)
}

export const createComment = (comment: Comment) => {
    return instance.post("/", comment)
}
