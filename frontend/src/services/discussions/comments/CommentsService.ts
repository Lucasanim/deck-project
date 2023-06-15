import CommentDetail from "../../../models/discussions/CommentDetail";
import { GenericClient } from "../../genericClient/genericClient";

const instance = new GenericClient("/discussions/comment");

export const fetchCommentsByDiscussionId = (discussionId: string | number) => {
    return instance.get<CommentDetail[]>(`/get-from-discussion/${discussionId}`)
}
