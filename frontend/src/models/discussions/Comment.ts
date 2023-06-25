export default interface Comment {
    id: string,
    creatorId: number,
    discussionId: number,
    body: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}