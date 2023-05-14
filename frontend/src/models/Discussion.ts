import Comment from "./Comment";

export default interface Discussion {
    id: string,
    creatorId: number,
    title: string,
    body: string,
    comments: Comment[],
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}