import Comment from "./Comment";

export default interface DiscussionDetail {
    id: string,
    creatorId: number,
    creatorUserName: string,
    title: string,
    body: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}