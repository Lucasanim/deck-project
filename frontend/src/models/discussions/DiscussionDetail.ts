import Comment from "./Comment";

export default interface DiscussionDetail {
    id: number,
    creatorId: number,
    creatorUserName: string,
    title: string,
    body: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}